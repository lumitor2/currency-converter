# Currency converter to Czech crown (CZK)

This application presents simple usage of React + Typescript with basic usage of React Query and Styled components.

Browser fetch of data is not allowed through CORS limits. And because of this there is also BE server to circumvent this complication.
It downloads fresh response from ČNB and will also prepare response in right typed format.

Otherwise I would fetch those data (txt file) during app build through command line, but this solution was not preferred because of data freshness and solution completeness.

I used [pnpm](https://pnpm.io) as package manager. Application runs on [Vite](https://vitejs.dev/) and has React v18.

## How to run and test app?

1. Clone this repo
2. Start BE server - server is automatically started on port 3000

```
cd server
pnpm i
pnpm prod
```

3. Build or start already built app

```
pnpm i
pnpm build
pnpm preview
```

Application now runs on `http://localhost:4173/`

## Options for simple deployment on production

1. BE server can run as system service or under PM2, Caddy or nginx + Let's encrypt
2. Docker containers with docker-compose and Caddy proxies (FE production build with file serve, BE on port proxy as /api virtualhost)
3. .. so many options :-)

## Sources

Data is loaded from [Czech national bank](https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt)

Documentation: https://www.cnb.cz/en/faq/Format-of-the-foreign-exchange-market-rates/
