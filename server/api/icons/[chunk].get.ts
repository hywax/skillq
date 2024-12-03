import { z } from 'zod'

const requestSchema = z.object({
  chunk: z.number({ coerce: true }).int(),
})

export default eventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, requestSchema.parse)

  return getIconsPage(params.chunk)
})
