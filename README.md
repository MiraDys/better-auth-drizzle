# Better Auth Template with Drizzle ORM

Local SQLite DB is used for this template.
Password hashing Better-Auth default scrypt.

## Missing Features

- [ ] security -- rate limiting, captcha, bot detection, email validation,
- [ ] Add a feature to change the password
- [ ] Add a feature to verify the email -- default is NULL.
- [ ] Add a feature to change the email
- [ ] Add a feature to delete the account

## Requirements

- Node.js 20+
- npm
- Next
- Better-auth
- Drizzle ORM
- SQLite

## How to use

1. Clone the repo
2. Run `npm install`
3. Run `npm run dev`
4. copy .env.example to .env and change the variables
5. Run `npx drizzle-kit generate` & verify the example.db sqlite file was created at root dir
6. Open [http://localhost:3000](http://localhost:3000)
