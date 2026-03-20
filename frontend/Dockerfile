
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

# Stage 2: Run with Node (SSR)
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist/frontend/server ./dist/frontend/server
COPY --from=build /app/dist/frontend/browser ./dist/frontend/browser
EXPOSE 4000
CMD ["node", "dist/frontend/server/server.mjs"]