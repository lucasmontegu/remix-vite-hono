FROM oven/bun:1
WORKDIR /app
COPY . .
RUN bun install

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package.json
RUN bun install

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun bun:build
RUN bun prune

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 remix
COPY --from=builder /app .
USER remix
EXPOSE 3000
ENV PORT 3000
CMD ["bun", "start"]