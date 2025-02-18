import { betterAuth } from "better-auth";
import { passkey } from "better-auth/plugins/passkey";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/index"; // your drizzle instance
import * as schema from "@/lib/schema"; // Import your schema

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  plugins: [passkey()],
  database: drizzleAdapter(db, {
    provider: "sqlite", // or "mysql", "sqlite"
    schema: schema, // Pass your schema here
  }),
});
