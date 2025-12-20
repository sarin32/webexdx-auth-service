# ---- Stage 1: builder ----
FROM node:22-alpine AS builder

WORKDIR /app

# enable pnpm without global npm install
ENV corepack_enable_download_prompt=0
RUN corepack enable

ENV PNPM_STORE_PATH=/pnpm/store

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build:prod


# ---- Stage 2: runtime ----
FROM node:22-alpine AS final

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

ENV corepack_enable_download_prompt=0
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

COPY --from=builder /app/build ./build

COPY .env ./

EXPOSE ${PORT}
CMD ["pnpm","run","start:prod"]
