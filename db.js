import "dotenv/config";
import http from "http";
import { neon } from "@neondatabase/serverless";

export const sql = neon(process.env.DATABASE_URL);

