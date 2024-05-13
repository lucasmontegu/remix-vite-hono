#FROM oven/bun:latest as base
FROM imbios/bun-node:latest-current-slim as base
LABEL fly_launch_runtime="Bun"

# Bun app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY package.json bun.lockb ./
RUN bun install --ci

# Copy application code
COPY . .

WORKDIR /app
RUN bun run build

# Final stage for app image
FROM base

# Copy built artifacts and dependencies
COPY --from=build /app/build /app/build
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "bun", "run", "start" ]

