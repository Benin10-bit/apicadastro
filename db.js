import "dotenv/config";
import http from "http";
import { neon } from "@neondatabase/serverless";

export const sql = neon('postgresql://neondb_owner:npg_Wbhj2oPiAM3a@ep-cold-voice-ad4dutrq-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require');

