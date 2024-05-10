ARG BUN_VERSION=1.1.1
FROM oven/bun:${BUN_VERSION}-slim as base

# Bun app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Install dependencies
FROM base as deps
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --ci

# Build the application
FROM deps as build
WORKDIR /app
COPY . .
RUN bun run build

# Production image with minimal footprint
FROM base as production
WORKDIR /app

# Copy built artifacts and dependencies
COPY --from=build /app/build /app/build
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json

CMD ["bun", "run", "start"]