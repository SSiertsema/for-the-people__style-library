import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, resolve } from 'path'

interface TokenValue {
  value: string
  type?: string
  description?: string
}

interface TokenGroup {
  [key: string]: TokenValue | TokenGroup
}

function isTokenValue(obj: unknown): obj is TokenValue {
  return typeof obj === 'object' && obj !== null && 'value' in obj
}

function loadJsonFile(filepath: string): TokenGroup | null {
  if (!existsSync(filepath)) {
    return null
  }
  return JSON.parse(readFileSync(filepath, 'utf-8'))
}

function setNestedValue(obj: TokenGroup, path: string, value: string): boolean {
  const parts = path.split('.')
  let current: TokenGroup = obj

  // Navigate to the parent of the target
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i]
    if (!(part in current) || typeof current[part] !== 'object' || current[part] === null) {
      return false
    }
    current = current[part] as TokenGroup
  }

  const lastPart = parts[parts.length - 1]

  // Check if the target exists and is a token value
  if (!(lastPart in current)) {
    return false
  }

  const target = current[lastPart]
  if (!isTokenValue(target)) {
    return false
  }

  // Update the value
  target.value = value
  return true
}

export default defineEventHandler(async (event) => {
  const pathParts = event.context.params?.path
  if (!pathParts) {
    throw createError({ statusCode: 400, message: 'Path is required' })
  }

  const filePath = Array.isArray(pathParts) ? pathParts.join('/') : pathParts

  // Validate path to prevent directory traversal
  if (filePath.includes('..') || filePath.startsWith('/') || filePath.includes('\\')) {
    throw createError({ statusCode: 400, message: 'Invalid path' })
  }

  // Read and validate request body
  const body = await readBody(event)
  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, message: 'Request body is required' })
  }

  const { path: tokenPath, value } = body as { path?: string; value?: string }

  if (!tokenPath || typeof tokenPath !== 'string') {
    throw createError({ statusCode: 400, message: 'Token path is required' })
  }

  if (value === undefined || typeof value !== 'string') {
    throw createError({ statusCode: 400, message: 'Token value is required' })
  }

  // Validate token path to prevent injection
  if (tokenPath.includes('..') || tokenPath.includes('/') || tokenPath.includes('\\')) {
    throw createError({ statusCode: 400, message: 'Invalid token path' })
  }

  const tokensPath = resolve(process.cwd(), '../tokens')
  const fullFilePath = join(tokensPath, `${filePath}.json`)

  // Ensure the resolved path is still within the tokens directory
  const resolvedPath = resolve(fullFilePath)
  if (!resolvedPath.startsWith(resolve(tokensPath))) {
    throw createError({ statusCode: 400, message: 'Invalid path' })
  }

  const tokens = loadJsonFile(fullFilePath)
  if (!tokens) {
    throw createError({ statusCode: 404, message: `Token file not found: ${filePath}` })
  }

  // Update the token value
  const success = setNestedValue(tokens, tokenPath, value)
  if (!success) {
    throw createError({ statusCode: 404, message: `Token path not found: ${tokenPath}` })
  }

  // Write updated JSON back to file with proper formatting
  try {
    writeFileSync(fullFilePath, JSON.stringify(tokens, null, 2) + '\n', 'utf-8')
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `Failed to write token file: ${error instanceof Error ? error.message : 'Unknown error'}`
    })
  }

  return {
    success: true,
    path: `${filePath}.json`,
    tokenPath,
    value
  }
})
