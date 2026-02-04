import {readBody, createError, setResponseStatus} from 'h3'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const body = await readBody<Record<string, unknown>>(event)

    if (!config.apiUrl) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Server misconfigured: runtimeConfig.apiUrl is missing',
            data: {
                hint: 'Ensure API_URL is set in the environment Nuxt is running with (e.g. app/.env).',
            },
        })
    }

    const upstreamUrl = `${config.apiUrl.replace(/\/$/, '')}/contact-form`

    try {
        // Use raw so we can see upstream status/body if it fails
        const res = await $fetch.raw(upstreamUrl, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json',
            },
        })

        // Mirror upstream status (optional, but nice)
        setResponseStatus(event, res.status)
        return res._data
    } catch (err: any) {
        // Try to expose useful debugging info (especially for API Gateway errors)
        console.log(err);
        const statusCode = err?.response?.status ?? 502
        const upstreamBody = err?.response?._data

        throw createError({
            statusCode,
            statusMessage: 'Upstream contact-form request failed',
            data: {
                upstreamUrl,
                upstreamStatus: err?.response?.status,
                upstreamBody,
                message: err?.message ?? 'Unknown error',
            },
        })
    }
})
