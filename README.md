This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the npm modules (using Node v18.17.5)
```bash
npm install or npm ci
```

then initiate the postgres db with the prisma migrations (only do this if the db has not been initialized)

prisma-migrate
```bash
npm run prisma-migrate
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Production site hosted at [https://ride-share-ten.vercel.app/](https://ride-share-ten.vercel.app/)
