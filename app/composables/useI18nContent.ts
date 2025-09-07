import { computed, type ComputedRef } from 'vue'
import { useI18n } from 'vue-i18n'

// Helpers to recognize common shapes
function isArrayOfStrings(v: unknown): v is string[] {
    return Array.isArray(v) && v.every((x) => typeof x === 'string')
}

type StaticBodyItem = { body?: { static?: unknown } | undefined }
function isArrayOfStaticBody(v: unknown): v is StaticBodyItem[] {
    return Array.isArray(v) && v.every(
        (x) => x && typeof x === 'object' && 'body' in (x as object)
    )
}

function pickPreferredString(obj: Record<string, unknown>): string | undefined {
    // Prefer the specific path first
    const body = obj.body as Record<string, unknown> | undefined
    const staticStr = body?.static
    if (typeof staticStr === 'string') return staticStr

    // Then try some common keys
    for (const key of ['text', 'value', 'content', 'description', 'html']) {
        const v = obj[key]
        if (typeof v === 'string') return v
    }

    // Finally, first string value in the object
    for (const v of Object.values(obj)) {
        if (typeof v === 'string') return v
    }

    return undefined
}

export function normalizeI18nContent(input: unknown): string[] {
    // Fast lanes for common shapes, without over-traversal
    if (isArrayOfStrings(input)) {
        return [...new Set(input)] // dedupe while preserving order
    }

    if (isArrayOfStaticBody(input)) {
        const out: string[] = []
        const seen = new Set<string>()
        for (const item of input) {
            const str = pickPreferredString(item as Record<string, unknown>)
            if (str && !seen.has(str)) {
                seen.add(str)
                out.push(str)
            }
        }
        return out
    }

    // Conservative fallback: walk shallowly and dedupe
    const out: string[] = []
    const seen = new Set<string>()

    const visit = (v: unknown, depth: number) => {
        if (typeof v === 'string') {
            if (!seen.has(v)) {
                seen.add(v)
                out.push(v)
            }
            return
        }
        if (Array.isArray(v)) {
            for (const item of v) visit(item, depth)
            return
        }
        if (v && typeof v === 'object' && depth < 2) {
            const picked = pickPreferredString(v as Record<string, unknown>)
            if (picked) {
                if (!seen.has(picked)) {
                    seen.add(picked)
                    out.push(picked)
                }
                return
            }
            for (const val of Object.values(v as Record<string, unknown>)) {
                visit(val, depth + 1)
            }
        }
    }

    visit(input, 0)
    return out
}

// Reactive: updates when locale/messages change
export function useI18nArray(key: string): ComputedRef<string[]> {
    const i18n = useI18n() as unknown as { tm: (k: string) => unknown }
    return computed(() => normalizeI18nContent(i18n.tm(key)))
}

// Non-reactive: snapshot lookup
export function getI18nArray(key: string): string[] {
    const i18n = useI18n() as unknown as { tm: (k: string) => unknown }
    return normalizeI18nContent(i18n.tm(key))
}

// Helper to extract string from i18n AST object
function extractI18nString(obj: unknown): string | undefined {
    if (typeof obj === 'string') return obj

    if (obj && typeof obj === 'object') {
        const astObj = obj as { body?: { static?: string } }
        if (astObj.body?.static) {
            return astObj.body.static
        }
    }

    return undefined
}

// Helper to normalize i18n objects that may contain AST structures
function normalizeI18nObject(obj: unknown): any {
    if (Array.isArray(obj)) {
        return obj.map(normalizeI18nObject)
    }

    if (obj && typeof obj === 'object') {
        const result: any = {}
        for (const [key, value] of Object.entries(obj)) {
            const stringValue = extractI18nString(value)
            if (stringValue !== undefined) {
                result[key] = stringValue
            } else {
                result[key] = normalizeI18nObject(value)
            }
        }
        return result
    }

    return obj
}

// Updated function for structured i18n objects that handles AST format
export function useI18nObject<T = any>(key: string): ComputedRef<T> {
    const i18n = useI18n() as unknown as { tm: (k: string) => any }
    return computed(() => {
        const rawData = i18n.tm(key)
        return normalizeI18nObject(rawData) as T
    })
}

// Non-reactive version
export function getI18nObject<T = any>(key: string): T {
    const i18n = useI18n() as unknown as { tm: (k: string) => any }
    const rawData = i18n.tm(key)
    return normalizeI18nObject(rawData) as T
}

