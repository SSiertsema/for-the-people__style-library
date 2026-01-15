import { defineNuxtModule } from '@nuxt/kit'
import { readFileSync, existsSync } from 'fs'
import { resolve, join } from 'path'

interface TokenValue {
  value: string
  type?: string
  description?: string
}

interface TokenGroup {
  [key: string]: TokenValue | TokenGroup
}

interface FlatToken {
  name: string
  variable: string
  value: string
  description?: string
}

interface TokenCategory {
  name: string
  tokens: FlatToken[]
}

interface ColorPalette {
  name: string
  shades: Array<{
    shade: string
    value: string
  }>
}

interface DesignTokens {
  colors: TokenCategory[]
  colorPalettes: ColorPalette[]
  spacing: FlatToken[]
  radius: FlatToken[]
  shadow: FlatToken[]
}

function isTokenValue(obj: unknown): obj is TokenValue {
  return typeof obj === 'object' && obj !== null && 'value' in obj
}

function loadJsonFile(filepath: string): TokenGroup {
  if (!existsSync(filepath)) {
    console.warn(`Token file not found: ${filepath}`)
    return {}
  }
  return JSON.parse(readFileSync(filepath, 'utf-8'))
}

function buildPrimitiveLookup(primitives: TokenGroup): Map<string, string> {
  const lookup = new Map<string, string>()

  function traverse(obj: TokenGroup, prefix: string) {
    for (const [key, value] of Object.entries(obj)) {
      if (key.startsWith('$')) continue
      const path = prefix ? `${prefix}.${key}` : key

      if (isTokenValue(value)) {
        lookup.set(path, value.value)
      } else if (typeof value === 'object' && value !== null) {
        traverse(value as TokenGroup, path)
      }
    }
  }

  traverse(primitives, '')
  return lookup
}

function resolveReference(value: string, lookup: Map<string, string>): string {
  // Match {token.path} references
  const refMatch = value.match(/^\{(.+)\}$/)
  if (refMatch) {
    const resolved = lookup.get(refMatch[1])
    return resolved || value
  }
  return value
}

function flattenTokens(
  tokens: TokenGroup,
  primitiveLookup: Map<string, string>,
  prefix = ''
): FlatToken[] {
  const result: FlatToken[] = []

  for (const key of Object.keys(tokens)) {
    if (key.startsWith('$')) continue

    const value = tokens[key]
    const path = prefix ? `${prefix}.${key}` : key

    if (isTokenValue(value)) {
      result.push({
        name: path.replace(/\./g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        variable: `--${path.replace(/\./g, '-')}`,
        value: resolveReference(value.value, primitiveLookup),
        description: value.description
      })
    } else if (typeof value === 'object' && value !== null) {
      result.push(...flattenTokens(value as TokenGroup, primitiveLookup, path))
    }
  }

  return result
}

function groupByFirstSegment(tokens: FlatToken[]): TokenCategory[] {
  const groups = new Map<string, FlatToken[]>()

  for (const token of tokens) {
    const firstDot = token.variable.indexOf('-', 2) // Skip initial --
    const category = firstDot > 2
      ? token.variable.slice(2, firstDot)
      : token.variable.slice(2)

    if (!groups.has(category)) {
      groups.set(category, [])
    }
    groups.get(category)!.push(token)
  }

  return Array.from(groups.entries()).map(([name, tokens]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    tokens
  }))
}

export default defineNuxtModule({
  meta: {
    name: 'scss-parser',
    configKey: 'scssParser'
  },
  setup(_options, nuxt) {
    const tokensPath = resolve(nuxt.options.rootDir, '../tokens')

    // Load all primitives
    const colorPrimitives = loadJsonFile(join(tokensPath, 'primitives/color.json'))
    const spacingPrimitives = loadJsonFile(join(tokensPath, 'primitives/spacing.json'))
    const radiusPrimitives = loadJsonFile(join(tokensPath, 'primitives/radius.json'))
    const shadowPrimitives = loadJsonFile(join(tokensPath, 'primitives/shadow.json'))

    // Build lookup for resolving references
    const primitiveLookup = new Map<string, string>()
    for (const [prefix, primitives] of [
      ['', colorPrimitives],
      ['spacing', spacingPrimitives],
      ['radius', radiusPrimitives],
      ['shadow', shadowPrimitives]
    ] as const) {
      const lookup = buildPrimitiveLookup(primitives as TokenGroup)
      for (const [key, value] of lookup) {
        primitiveLookup.set(prefix ? `${prefix}.${key}` : key, value)
      }
    }

    // Load semantic tokens
    const colorSemantics = loadJsonFile(join(tokensPath, 'semantics/color.json'))
    const spacingSemantics = loadJsonFile(join(tokensPath, 'semantics/spacing.json'))
    const radiusSemantics = loadJsonFile(join(tokensPath, 'semantics/radius.json'))
    const shadowSemantics = loadJsonFile(join(tokensPath, 'semantics/shadow.json'))

    // Load component tokens
    const avatarTokens = loadJsonFile(join(tokensPath, 'components/avatar.json'))

    // Parse color primitives into palettes
    const colorPalettes: ColorPalette[] = Object.entries(colorPrimitives).map(([name, shades]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      shades: Object.entries(shades as Record<string, TokenValue>)
        .filter(([key]) => !key.startsWith('$'))
        .map(([shade, token]) => ({
          shade,
          value: token.value
        }))
        .sort((a, b) => {
          const aNum = parseInt(a.shade) || 0
          const bNum = parseInt(b.shade) || 0
          return aNum - bNum
        })
    }))

    // Flatten tokens with resolved references
    const colorTokens = flattenTokens(colorSemantics, primitiveLookup)
    const avatarFlatTokens = flattenTokens(avatarTokens, primitiveLookup)
    const spacingTokens = flattenTokens(spacingSemantics, primitiveLookup)
    const radiusTokens = flattenTokens(radiusSemantics, primitiveLookup)
    const shadowTokens = flattenTokens(shadowSemantics, primitiveLookup)

    const designTokens: DesignTokens = {
      colors: groupByFirstSegment(colorTokens),
      colorPalettes,
      spacing: spacingTokens,
      radius: radiusTokens,
      shadow: shadowTokens
    }

    // Make tokens available via runtime config
    nuxt.options.runtimeConfig.public.designTokens = designTokens
  }
})

declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    designTokens: DesignTokens
  }
}
