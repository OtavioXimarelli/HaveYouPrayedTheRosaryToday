# Build stage
FROM node:20-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory to workspace root
WORKDIR /workspace

# Force cache bust - update timestamp to force rebuild
ARG CACHEBUST=2026-01-31-v3

ENV NODE_ENV=development

# Copy workspace files (monorepo structure)
COPY pnpm-workspace.yaml pnpm-lock.yaml ./
COPY backend ./backend

# Install dependencies (include devDependencies needed for build)
RUN pnpm install --filter=backend --frozen-lockfile

# Build the application
WORKDIR /workspace/backend
RUN pnpm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Copy the entire workspace to preserve pnpm symlink structure
COPY --from=builder --chown=nestjs:nodejs /workspace ./

# The backend dist and node_modules are accessible via workspace structure
WORKDIR /app/backend

USER nestjs

EXPOSE 3001

ENV PORT=3001

# Run from backend directory where symlinks are valid
CMD ["node", "dist/main.js"]
