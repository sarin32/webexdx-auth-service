# syntax=docker/dockerfile:1.4

# ---- Stage 1: builder ----
FROM node:22-alpine AS builder

WORKDIR /app

# enable pnpm without global npm install
ENV corepack_enable_download_prompt=0
RUN corepack enable

# Configure pnpm to use cache directory
RUN pnpm config set store-dir /pnpm/store

COPY package.json pnpm-lock.yaml ./
# Use BuildKit cache mount for pnpm store
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build:prod


# ---- Stage 2: runtime ----
FROM node:22-alpine AS final

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

ENV corepack_enable_download_prompt=0
RUN corepack enable

# Configure pnpm to use cache directory
RUN pnpm config set store-dir /pnpm/store

COPY package.json pnpm-lock.yaml ./
# Use BuildKit cache mount for pnpm store
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --prod --frozen-lockfile

COPY --from=builder /app/build ./build

COPY .env ./

EXPOSE ${PORT}
CMD ["pnpm","run","start:prod"]
