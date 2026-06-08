# Wholesale Jump Rope B2B Website

English wholesale inquiry website for custom jump rope buyers, built with Next.js App Router, Tailwind CSS, GSAP ScrollTrigger, Prisma, PostgreSQL and Resend.

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run prisma:generate
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="change-this-password"
RESEND_API_KEY=""
NEXT_PUBLIC_WHATSAPP_NUMBER="15551234567"
NEXT_PUBLIC_SITE_URL="https://example.com"
DEEPSEEK_API_KEY=""
DEEPSEEK_MODEL="deepseek-chat"
CLOUDFLARE_R2_ACCOUNT_ID=""
CLOUDFLARE_R2_ACCESS_KEY_ID=""
CLOUDFLARE_R2_SECRET_ACCESS_KEY=""
CLOUDFLARE_R2_BUCKET=""
CLOUDFLARE_R2_PUBLIC_URL=""
```

`RESEND_API_KEY` is optional for local layout testing. When it is missing, inquiries are still saved to the database and email notification is skipped.

`DEEPSEEK_API_KEY` is optional. When configured, the admin inquiry page can translate customer messages into Chinese from the backend without exposing the key to the browser.

Cloudflare R2 variables are optional. If they are missing, admin image uploads are saved locally under `public/uploads`. When configured, uploads use Cloudflare R2 through its S3-compatible API and return URLs based on `CLOUDFLARE_R2_PUBLIC_URL`.

On Cloudflare Workers, site content and inquiries are stored in the `SITE_DATA` KV namespace, and uploaded images are stored in the `SITE_IMAGES` R2 bucket. Local filesystem fallback is only for local development.

## Database

Create a PostgreSQL database on Neon, Supabase, Vercel Postgres or another PostgreSQL provider, then run:

```bash
npm run prisma:migrate
```

The migration creates the `inquiries` table with customer contact fields, message, status and timestamps.

## Admin

- Login: `http://localhost:3000/admin/login`
- Inquiry list: `http://localhost:3000/admin/inquiries`
- Website content: `http://localhost:3000/admin/content`
- Password source: `ADMIN_PASSWORD`
- Status values: `new`, `contacted`, `quoted`, `closed`, `spam`

## API

`POST /api/inquiry`

```json
{
  "name": "Buyer Name",
  "email": "buyer@example.com",
  "whatsapp": "+1 555 123 4567",
  "country": "United States",
  "productInterest": "Speed Jump Rope",
  "quantity": "1000 pcs",
  "message": "Please quote custom logo and color box packaging."
}
```

Required fields: `name`, `email`, `message`.

## Cloudflare Deployment

This project is configured for Cloudflare dashboard deployment through GitHub integration. See the Chinese guide for the exact dashboard settings:

```text
部署说明.md
```

## GitHub

This folder is safe to push after checking `.gitignore`. Do not commit `.env.local`, `.dev.vars`, `.data`, `.open-next`, `.wrangler`, or `public/uploads`.

```bash
git init
git add .
git commit -m "Initial Cloudflare-ready website"
git branch -M main
git remote add origin git@github.com:YOUR_USER/YOUR_REPO.git
git push -u origin main
```
