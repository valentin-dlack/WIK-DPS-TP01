FROM node:18-alpine as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/package.json ./
RUN npm install --only=production
COPY --from=builder /app/build ./build
EXPOSE 3000
CMD ["node", "build/index.js"]