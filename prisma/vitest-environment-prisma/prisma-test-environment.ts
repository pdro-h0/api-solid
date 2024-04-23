import "dotenv/config";

import { randomUUID } from "node:crypto";
import type { Environment } from "vitest";
import { db } from "../../lib/prisma";

const generateDatabaseURL = (schema: string) => {
  if (!process.env.DATABASE_URL) {
    throw new Error("please provide a DATABASE_URL enviroment variable");
  }

  const url = new URL(process.env.DATABASE_URL as string);

  url.searchParams.set("schema", schema);

  return url.toString();
};

export default <Environment>{
  name: "prisma",
  async setup() {
    const schema = randomUUID();
    const databaseURL = generateDatabaseURL(schema);

    process.env.DATABASE_URL = databaseURL;

    return {
      async teardown() {
        await db.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);

        await db.$disconnect();
      },
    };
  },
  transformMode: "ssr",
};
