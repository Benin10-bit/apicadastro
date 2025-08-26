import { randomUUID } from "node:crypto"
import { sql } from "./db.js"

export class dataBaseMemory{
    #users = new Map()

    List(){
        return Array.from(this.#users.entries()).map((userData) => {
            const Id = userData[0]
            const data = userData[1]

            return{
                Id,
                ...data
            }
        })
    }

    async Create(user){
        const newId = randomUUID()

        await sql`INSERT INTO users (username, password) VALUES (${user.username}, ${user.password});`
    }
}