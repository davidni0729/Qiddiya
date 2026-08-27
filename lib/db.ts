import { env } from "cloudflare:workers";
import {
  createInviteCodesTable,
  createRegistrationDateIndex,
  createRegistrationsTable,
  seedFirstSignalInvite,
} from "@/db/schema";

let initialized = false;

export function getDb(): D1Database {
  return (env as unknown as { DB: D1Database }).DB;
}

export async function initializeDb(): Promise<D1Database> {
  const db = getDb();

  if (!initialized) {
    await db.batch([
      db.prepare(createRegistrationsTable),
      db.prepare(createInviteCodesTable),
      db.prepare(createRegistrationDateIndex),
      db.prepare(seedFirstSignalInvite),
    ]);
    initialized = true;
  }

  return db;
}
