import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import { z } from "zod"
import { validarCNPJ } from "./cnpj-validator";
import PasswordValid from "./password-validator";
import { validType } from "./valid-type";
import { validNullable } from "./valid-nullables";

const app = fastify()

const prisma = new PrismaClient()

app.get('/users', async () => {
    const user = await prisma.user.findMany()
    return { user }
})

app.post('/users/login/:params', async (request, reply) => {
    const param: any = request.params
    const data = param.params
    const { password } = request.body as any
    const email = await prisma.user.findFirst({ where: { email: data, password: password } })
    const cnpj = await prisma.user.findFirst({ where: { CNPJ: data, password: password } })
    if (email || cnpj) {
        return reply.status(201).send('Usuário Logado')
    }
    return reply.status(401).send('Email, CNPJ ou Senha inválida')
})

app.post('/users/resetpassword', async (request, reply) => {
    const { email, cnpj } = request.body as any
    if (email) {
        const emailConfirm = await prisma.user.findFirst({ where: { email: email } })
        if (emailConfirm) {
            return reply.status(201).send(`Email enviado para ${email}`)

        }
    }

    if (cnpj) {
        const cnpjConfirm = await prisma.user.findFirst({ where: { CNPJ: cnpj } })
        if (cnpjConfirm) {
            return reply.status(201).send(`Email enviado para ${cnpjConfirm.email}`)
        }
    }
    return reply.status(401).send('Email ou CNPJ inválido')
})

app.post('/users', async (request: any, reply) => {
    const validPassword = new PasswordValid(request.body.password)
    if (!validType((String(request.body.tipo)).toUpperCase())) {
        return reply.status(401).send('Tipo de Usuário Inválido! Escolha Fornecedor, Cliente ou Transportador ')
    }
    if (!validPassword.validate().isValid) {
        return reply.status(401).send(`Senha inválida: ${validPassword.validate().message}`)
    }
    if (!validarCNPJ(request.body.CNPJ)) {
        return reply.status(401).send('CNPJ inválido')
    }
    validNullable(request.body)




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
        tipo: (z.string()).toUpperCase(),
    })

    const {
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

app.delete('/users/delete/login/:id', async (request, reply) => {
    const param: any = request.params
    const id = param.id
    const user = await prisma.user.findFirst(id)
    console.log(user);

    if (user) {
        await prisma.user.delete({ where: { id } })
        return reply.status(201).send(`Usuário com ID: ${id} Deletado com Sucesso!!`)
    }
    return reply.status(401).send('Usuário ID não encontrado!!')
})

app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
}).then(() => {
    console.log('HTTP Server Running')
})