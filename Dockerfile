# --- Build stage ---
FROM node:14-alpine AS build

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build

# --- Production stage ---
FROM node:14-alpine

# Copy necessary files from the build stage
COPY --from=build package*.json ./
COPY --from=build node_modules ./node_modules
COPY --from=build build ./build

# Add a new user and switch to that user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Set the environment variable
ENV NODE_ENV=production

EXPOSE 3000
CMD ["node", "build/server.js"]
