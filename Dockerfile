# base bun image
FROM bun/bun:latest AS base

# set for base and all layer that inherit from it
ENV NODE_ENV production
ENV PORT 8080

# Install all node_modules, including dev dependencies
FROM base AS deps
WORKDIR /app
COPY package.json .
RUN bun install --production=false

# Setup production node_modules
FROM base AS production-deps
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY package.json .
RUN bun prune

# Build the app
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY . .
RUN bun bun:build

# Finally, build the production image with minimal footprint
FROM base
WORKDIR /app

# You only need these for production
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app/package.json

CMD ["bun", "start"]