# Build stage
FROM node:20-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory to workspace root
WORKDIR /workspace

# Force cache bust for fresh build
ARG CACHEBUST=1

ENV NODE_ENV=production

# Copy workspace files (monorepo structure)
COPY pnpm-workspace.yaml pnpm-lock.yaml ./
COPY backend ./backend

# Install dependencies
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

# Copy built dist from backend
COPY --from=builder --chown=nestjs:nodejs /workspace/backend/dist ./dist

# Copy node_modules from workspace root (pnpm workspace structure)
COPY --from=builder --chown=nestjs:nodejs /workspace/node_modules ./node_modules

# Copy backend package.json
COPY --from=builder --chown=nestjs:nodejs /workspace/backend/package*.json ./

USER nestjs

EXPOSE 3001

ENV PORT=3001

CMD ["node", "dist/main.js"]
