import { randomUUID } from "node:crypto"
import { sql } from "./db.js"

export class dataBaseMemory{
    #users = new Map()

    async List() {
    try {
      // Consulta todos os usuários na tabela "users"
      const users = await sql`SELECT id, username FROM users;`; // evita enviar senha
      return users;
    } catch (err) {
      console.error("Erro ao listar usuários:", err);
      return [];
    }
  }

    async Create(user){
        const newId = randomUUID()

        await sql`INSERT INTO users (username, password) VALUES (${user.username}, ${user.password});`
    }
}