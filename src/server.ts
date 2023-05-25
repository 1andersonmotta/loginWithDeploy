import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import { z } from "zod"
import path from "path";

const app = fastify()

const prisma = new PrismaClient()

app.get('/users', async () => {
    const user = await prisma.user.findMany()

    return { user }
})

app.post('/users', async (request, reply) => {
    console.log('salvou', request.body);

    const createUserSchema = z.object({
        nome: z.string(),
        email: z.string().email(),
        bairro: z.string(),
        CEP: z.string(),
        CNPJ: z.string(),
        complemento: z.string(),
        endereco: z.string(),
        incricaoEstadual: z.string(),
        incricaoMunicipal: z.string(),
        nomeFantasia: z.string(),
        numero: z.string(),
        password: z.string(),
        razaoSocial: z.string(),
        telefone: z.string(),
        tipo: z.string(),

    })
    const { nome, email, bairro,
        CEP,
        CNPJ,
        complemento,
        endereco,
        incricaoEstadual,
        incricaoMunicipal,
        nomeFantasia,
        numero,
        password,
        razaoSocial,
        telefone,
        tipo,
    } = createUserSchema.parse(request.body)
    await prisma.user.create({
        data: {
            nome,
            email,
            bairro,
            CEP,
            CNPJ,
            complemento,
            endereco,
            incricaoEstadual,
            incricaoMunicipal,
            nomeFantasia,
            numero,
            password,
            razaoSocial,
            telefone,
            tipo,


        }
    })

    return reply.status(201).send()
})

const publicDir = path.join(__dirname, 'public');

app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
}).then(() => {
    console.log('HTTP Server Running')
})