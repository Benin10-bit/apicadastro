import { sql } from "./db.js";

export class dataBaseMemory {
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

  async Create(user) {
    await sql`INSERT INTO users (username, password) VALUES (${user.username}, ${user.password});`;
  }

  async Login(user) {
    const result =
      await sql`SELECT password FROM users WHERE username = ${user};`;
    if (result.length === 0) return null; // usuário não encontrado
    return result[0].password; // retorna apenas o hash da senha
  }
}
