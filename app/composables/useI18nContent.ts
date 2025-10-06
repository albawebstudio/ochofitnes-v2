import { computed } from 'vue'
import type { ComputedRef } from 'vue'

// Function to extract string from i18n AST formats
function extractI18nString(obj: unknown): string | undefined {
    // Handle string directly
    if (typeof obj === 'string') return obj

    // Handle null/undefined
    if (!obj) return undefined

    // Handle object formats
    if (typeof obj === 'object') {
        const astObj = obj as any

        // Try to stringify the object if it's a complex structure we don't understand
        // This is a last resort to prevent showing raw objects to users
        if (typeof astObj.toString === 'function' && astObj.toString() !== '[object Object]') {
            return astObj.toString()
        }

        // Handle common AST structures

        // Format 1: { b: { s: "string" } }
        if (astObj.b?.s && typeof astObj.b.s === 'string') {
            return astObj.b.s
        }

        // Format 2: { body: { static: "string" } }
        if (astObj.body?.static && typeof astObj.body.static === 'string') {
            return astObj.body.static
        }

        // Format 3: AST with body.items.static or similar
        if (astObj.body?.items && Array.isArray(astObj.body.items)) {
            const staticTexts = astObj.body.items
                .map((item: any) => item.static || '')
                .filter(Boolean)
                .join(' ')
            if (staticTexts) return staticTexts
        }

        // Format 4: { t: 0, b: { t: 2, i: [...], s: "string" } }
        if (astObj.t !== undefined && astObj.b?.s) {
            return astObj.b.s
        }

        // Format 5: direct static property
        if (astObj.static && typeof astObj.static === 'string') {
            return astObj.static
        }

        // Format 6: simple s property
        if (astObj.s && typeof astObj.s === 'string') {
            return astObj.s
        }

        // Format 7: deep nested objects
        if (astObj.type !== undefined && astObj.body) {
            return extractI18nString(astObj.body)
        }

        // Last-ditch effort: Try to stringify the entire object
        try {
            const stringified = JSON.stringify(astObj)
            if (stringified && stringified !== '{}' && stringified !== '[]') {
                // Search for common patterns in the stringified JSON
                const matches = stringified.match(/"s":"([^"]+)"/) ||
                    stringified.match(/"static":"([^"]+)"/)
                if (matches && matches[1]) {
                    return matches[1]
                }
            }
        } catch (e) {
            console.warn('Failed to extract string from i18n object', obj)
        }
    }

    // If all else fails, try to convert to string
    try {
        if (obj && typeof obj === 'object' && Object.keys(obj).length > 0) {
            return JSON.stringify(obj)
        }
    } catch (e) {
        console.warn('Failed to stringify i18n object', obj)
    }

    return undefined
}

// Function to normalize i18n content from various formats
function normalizeI18nContent(content: any): string[] {
    if (!content) return []

    // If already an array, map each item through the extractor
    if (Array.isArray(content)) {
        return content.map(item => extractI18nString(item) || '').filter(Boolean)
    }

    // Handle single object case
    const extracted = extractI18nString(content)
    return extracted ? [extracted] : []
}

// Function to normalize i18n objects
function normalizeI18nObject<T = any>(obj: any): T {
    if (!obj) return {} as T

    // If it's not an object, return as is
    if (typeof obj !== 'object') return obj as T

    // Special case for complex format string objects
    if (typeof obj === 'object') {
        // Try the extractI18nString function first for the whole object
        const simpleString = extractI18nString(obj)
        if (simpleString && typeof simpleString === 'string') {
            // If this is supposed to be just a string, return it
            if (typeof {} as T === 'string') {
                return simpleString as unknown as T
            }
        }
    }

    // For arrays, recursively normalize each item
    if (Array.isArray(obj)) {
        return obj.map(item => normalizeI18nObject(item)) as unknown as T
    }

    // For objects, recursively normalize each property
    const result: any = {}
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            // Try to extract string value from complex objects
            const extractedValue = extractI18nString(obj[key])
            if (extractedValue) {
                result[key] = extractedValue
            } else {
                // Recursively normalize nested objects
                result[key] = normalizeI18nObject(obj[key])
            }
        } else {
            // Keep primitive values as is
            result[key] = obj[key]
        }
    }

    return result as T
}

// Create a composable that can be used within components
export const useI18nContent = () => {
    // useI18n must be called inside the composable
    const { tm } = useI18n()

    // Helper functions that use the i18n instance
    const getI18nArray = (key: string): string[] => {
        try {
            const rawData = tm(key)
            return normalizeI18nContent(rawData)
        } catch (e) {
            console.error(`Error processing i18n array for key: ${key}`, e)
            return []
        }
    }

    const useI18nArray = (key: string): ComputedRef<string[]> => {
        return computed(() => {
            try {
                const rawData = tm(key)
                return normalizeI18nContent(rawData)
            } catch (e) {
                console.error(`Error processing i18n array for key: ${key}`, e)
                return []
            }
        })
    }

    const getI18nObject = <T = any>(key: string): T => {
        try {
            const rawData = tm(key)
            return normalizeI18nObject(rawData) as T
        } catch (e) {
            console.error(`Error processing i18n object for key: ${key}`, e)
            return {} as T
        }
    }

    const useI18nObject = <T = any>(key: string): ComputedRef<T> => {
        return computed(() => {
            try {
                const rawData = tm(key)
                return normalizeI18nObject(rawData) as T
            } catch (e) {
                console.error(`Error processing i18n object for key: ${key}`, e)
                return {} as T
            }
        })
    }

    return {
        getI18nArray,
        useI18nArray,
        getI18nObject,
        useI18nObject
    }
}
