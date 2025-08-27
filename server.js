import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import bcrypt from "bcryptjs";
import { dataBaseMemory } from "./database-memory.js";

const server = Fastify({ logger: true });

// 🔑 CORS global
await server.register(fastifyCors, {
  origin: "*",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"], 
  allowedHeaders: ["Content-Type", "Authorization"],
});

const dataBase = new dataBaseMemory();

server.post("/register", async (request, reply) => {
  const { nome, senha } = request.body;
  if (!nome || !senha)
    return reply.status(400).send({ error: "faltam campos" });

  const hash = await bcrypt.hash(senha, 10);
  await dataBase.Create({ username: nome, password: hash });

  return reply.status(201).send({ message: "Usuário cadastrado com sucesso" });
});

server.get("/users", async() => {
  return await dataBase.List();
});

const port = process.env.PORT || 1992;
server.listen({ port, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server rodando em: ${address}`);
});
