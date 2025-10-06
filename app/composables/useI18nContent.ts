import { computed } from 'vue'
import type { ComputedRef } from 'vue'

// Function to extract string from i18n AST formats
function extractI18nString(obj: unknown): string | undefined {
    if (typeof obj === 'string') return obj

    if (obj && typeof obj === 'object') {
        const astObj = obj as any

        // Handle vue-i18n AST format: { b: { s: "string" } }
        if (astObj.b?.s && typeof astObj.b.s === 'string') {
            return astObj.b.s
        }

        // Handle another AST format: { body: { static: "string" } }
        if (astObj.body?.static && typeof astObj.body.static === 'string') {
            return astObj.body.static
        }

        // Handle direct static property
        if (astObj.static && typeof astObj.static === 'string') {
            return astObj.static
        }

        // Handle 's' property directly (sometimes the structure varies)
        if (astObj.s && typeof astObj.s === 'string') {
            return astObj.s
        }

        // Handle complex objects with type, start, end, loc, body structure
        if (astObj.type !== undefined && astObj.body) {
            return extractI18nString(astObj.body)
        }
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

    // Special case for string-like objects with complex structure
    if (obj.type !== undefined && obj.body && obj.loc) {
        const extractedString = extractI18nString(obj)
        if (extractedString) return extractedString as unknown as T
    }

    // For arrays, recursively normalize each item
    if (Array.isArray(obj)) {
        return obj.map(item => normalizeI18nObject(item)) as unknown as T
    }

    // For objects, recursively normalize each property
    const result: any = {}
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            // Special case for AST-like objects
            if (obj[key].type !== undefined && obj[key].body) {
                const extractedValue = extractI18nString(obj[key])
                if (extractedValue) {
                    result[key] = extractedValue
                    continue
                }
            }

            // Recursively normalize nested objects
            result[key] = normalizeI18nObject(obj[key])
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
        return normalizeI18nContent(tm(key))
    }

    const useI18nArray = (key: string): ComputedRef<string[]> => {
        return computed(() => normalizeI18nContent(tm(key)))
    }

    const getI18nObject = <T = any>(key: string): T => {
        const rawData = tm(key)
        return normalizeI18nObject(rawData) as T
    }

    const useI18nObject = <T = any>(key: string): ComputedRef<T> => {
        return computed(() => {
            const rawData = tm(key)
            return normalizeI18nObject(rawData) as T
        })
    }

    return {
        getI18nArray,
        useI18nArray,
        getI18nObject,
        useI18nObject
    }
}
