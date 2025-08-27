import Fastify from "fastify";
import bcrypt from "bcrypt";
import { dataBaseMemory } from "./database-memory.js";

const server = Fastify({
  logger: true,
});

const dataBase = new dataBaseMemory();

server.post("/register", async (request, reply) => {
  const { nome, senha } = request.body;
  if (!nome || !senha)
    return reply.status(400).send({ error: "faltam campos" });

  const hash = await bcrypt.hash(senha, 10);
  await dataBase.Create({ username: nome, password: hash });

  return reply.status(201).send();
});

// Para listar usuários (somente teste)
server.get("/users", () => {
  const users = dataBase.List();
  return users;
});

server.listen({ port: 1992, host: "0.0.0.0" });
