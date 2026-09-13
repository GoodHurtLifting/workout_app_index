# Workout App Index: Windows setup

## Put the project in place

1. Extract this package.
2. Move the extracted `workout_app_index` folder to:
   `C:\Users\ryanl\Projects\workout_app_index`
3. In Android Studio, choose **File > Open** and select that folder.

Android Studio is being used as the code editor. This is a web project, so it runs in a browser rather than an Android emulator.

## Install and run the public site

Install Node.js 22.13 or newer. Then open Android Studio's Terminal and run:

```powershell
corepack enable
pnpm install
pnpm dev
```

Open `http://localhost:5173` in your browser. Keep the Terminal process running while you work.

## Enable the catalog manager locally

The catalog manager uses a local Cloudflare D1 database and the starter's simulated ChatGPT sign-in.

First build the local Worker configuration:

```powershell
pnpm build
```

Apply each existing database migration once:

```powershell
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_redundant_princess_powerful.sql
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0001_keen_smiling_tiger.sql
```

Start the development server with the local test account authorized:

```powershell
$env:ADMIN_EMAIL = "seedy@sites.test"
pnpm dev
```

Visit:

`http://localhost:5173/signin-with-chatgpt?return_to=/admin`

The local development environment signs in as the simulated user `Seedy`. Production continues to use the real owner-only authorization configured with the hosted Site.

## Working with Codex locally

Start a new Codex project/thread with `C:\Users\ryanl\Projects\workout_app_index` selected as its project folder. That lets Codex and Android Studio work on the same files.

The `.openai/hosting.json` file keeps the local checkout associated with the existing Workout App Index Site. Hosted secrets and production database contents are not included in this package.
