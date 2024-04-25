import { z } from "zod"
import { FastifyRequest, FastifyReply } from "fastify"
import { makeSearchGymsService } from "../../../services/factories/make-search-gyms-service"

export const search = async (req: FastifyRequest, reply: FastifyReply) =>{
    const searchGymsQuerySchema = z.object({
        query: z.string(),
        page: z.coerce.number().positive().min(1).default(1)
    })

    const { page, query } = searchGymsQuerySchema.parse(req.query)

    const searchGymsService = makeSearchGymsService();

    const { gyms } = await searchGymsService.execute({
        page,
        query
    })

    return reply.send({
        gyms,
    })
}