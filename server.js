import Fastify from "fastify";
import fs from "fs";
import bcrypt from "bcrypt";
import { dataBaseMemory } from "./database-memory.js";

const server = Fastify({ 
  logger: true,
  https: {
    key: fs.readFileSync('./localhost+2-key.pem'),
    cert: fs.readFileSync('./localhost+2.pem'),
    allowHTTP1: true,
    minVersion: 'TLSv1.2'
  }
});

server.addHook('onSend', (request, reply, payload, done) => {
  reply.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  done();
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
server.get('/users', () => {
  const users = dataBase.List();
  return users;
});

server.listen({ port: 1992, host: '0.0.0.0' });
