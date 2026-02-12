# Build stage
FROM node:20-bullseye-slim AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory to workspace root
WORKDIR /workspace

# Accept build arguments
ARG NEXT_PUBLIC_API_URL=http://localhost:3001/api
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Force production environment for build
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy workspace files (monorepo structure)
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY frontend ./frontend

# Install dependencies
RUN pnpm install --filter=frontend --frozen-lockfile

# Build the application
WORKDIR /workspace/frontend
RUN pnpm run build

# Debug: List what was created
RUN echo "=== Contents of .next directory ===" && \
    ls -la .next/ && \
    echo "=== Checking for standalone ===" && \
    (ls -la .next/standalone/ || echo "standalone directory not found")

# Production stage
FROM node:20-bullseye-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Verify standalone output exists and copy it
COPY --from=builder --chown=nextjs:nodejs /workspace/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /workspace/frontend/.next/static ./frontend/.next/static
COPY --from=builder --chown=nextjs:nodejs /workspace/frontend/public ./frontend/public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# The server.js is in the frontend subdirectory due to outputFileTracingRoot
CMD ["node", "frontend/server.js"]
