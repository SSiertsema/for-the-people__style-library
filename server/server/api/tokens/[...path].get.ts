import { readFileSync, existsSync } from 'fs'
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

function flattenTokenPaths(tokens: TokenGroup, prefix = ''): string[] {
  const paths: string[] = []

  for (const [key, value] of Object.entries(tokens)) {
    if (key.startsWith('$')) continue
    const path = prefix ? `${prefix}.${key}` : key

    if (isTokenValue(value)) {
      paths.push(path)
    } else if (typeof value === 'object' && value !== null) {
      paths.push(...flattenTokenPaths(value as TokenGroup, path))
    }
  }

  return paths
}

function getAvailableReferences(tokensPath: string) {
  const references: Record<string, string[]> = {
    color: [],
    dimension: [],
    shadow: [],
    other: []
  }

  // Load semantic color tokens
  const colorSemantics = loadJsonFile(join(tokensPath, 'semantics/color.json'))
  if (colorSemantics) {
    references.color.push(...flattenTokenPaths(colorSemantics))
  }

  // Load primitive colors
  const colorPrimitives = loadJsonFile(join(tokensPath, 'primitives/color.json'))
  if (colorPrimitives) {
    for (const [palette, shades] of Object.entries(colorPrimitives)) {
      if (typeof shades === 'object' && shades !== null) {
        for (const shade of Object.keys(shades as Record<string, unknown>)) {
          if (!shade.startsWith('$')) {
            references.color.push(`${palette}.${shade}`)
          }
        }
      }
    }
  }

  // Load semantic spacing tokens
  const spacingSemantics = loadJsonFile(join(tokensPath, 'semantics/spacing.json'))
  if (spacingSemantics) {
    references.dimension.push(...flattenTokenPaths(spacingSemantics))
  }

  // Load semantic radius tokens
  const radiusSemantics = loadJsonFile(join(tokensPath, 'semantics/radius.json'))
  if (radiusSemantics) {
    references.dimension.push(...flattenTokenPaths(radiusSemantics).map(p => `radius.${p}`))
  }

  // Load semantic shadow tokens
  const shadowSemantics = loadJsonFile(join(tokensPath, 'semantics/shadow.json'))
  if (shadowSemantics) {
    references.shadow.push(...flattenTokenPaths(shadowSemantics))
  }

  return references
}

function resolveTokenValue(value: string, tokensPath: string): string {
  const refMatch = value.match(/^\{(.+)\}$/)
  if (!refMatch) return value

  const refPath = refMatch[1]
  const parts = refPath.split('.')

  // Try semantic tokens first
  const semanticFiles = ['color', 'spacing', 'radius', 'shadow']
  for (const file of semanticFiles) {
    const semantics = loadJsonFile(join(tokensPath, `semantics/${file}.json`))
    if (semantics) {
      let current: unknown = semantics
      for (const part of parts) {
        if (typeof current === 'object' && current !== null && part in current) {
          current = (current as Record<string, unknown>)[part]
        } else {
          current = null
          break
        }
      }
      if (current && isTokenValue(current)) {
        // Recursively resolve if it's another reference
        return resolveTokenValue(current.value, tokensPath)
      }
    }
  }

  // Try primitives (color)
  const colorPrimitives = loadJsonFile(join(tokensPath, 'primitives/color.json'))
  if (colorPrimitives && parts.length >= 2) {
    const [palette, shade] = parts
    const paletteData = colorPrimitives[palette]
    if (paletteData && typeof paletteData === 'object' && shade in paletteData) {
      const token = (paletteData as Record<string, unknown>)[shade]
      if (isTokenValue(token)) {
        return token.value
      }
    }
  }

  return value
}

function addResolvedValues(tokens: TokenGroup, tokensPath: string): TokenGroup {
  const result: TokenGroup = {}

  for (const [key, value] of Object.entries(tokens)) {
    if (key.startsWith('$')) continue

    if (isTokenValue(value)) {
      result[key] = {
        ...value,
        resolvedValue: resolveTokenValue(value.value, tokensPath)
      } as TokenValue & { resolvedValue: string }
    } else if (typeof value === 'object' && value !== null) {
      result[key] = addResolvedValues(value as TokenGroup, tokensPath)
    }
  }

  return result
}

export default defineEventHandler(async (event) => {
  const pathParts = event.context.params?.path
  if (!pathParts) {
    throw createError({ statusCode: 400, message: 'Path is required' })
  }

  const path = Array.isArray(pathParts) ? pathParts.join('/') : pathParts

  // Validate path to prevent directory traversal
  if (path.includes('..') || path.startsWith('/')) {
    throw createError({ statusCode: 400, message: 'Invalid path' })
  }

  const tokensPath = resolve(process.cwd(), '../tokens')
  const filePath = join(tokensPath, `${path}.json`)

  const tokens = loadJsonFile(filePath)
  if (!tokens) {
    throw createError({ statusCode: 404, message: `Token file not found: ${path}` })
  }

  // Add resolved values to tokens
  const tokensWithResolved = addResolvedValues(tokens, tokensPath)

  // Get available references based on token types
  const availableReferences = getAvailableReferences(tokensPath)

  return {
    path: `${path}.json`,
    tokens: tokensWithResolved,
    availableReferences
  }
})
