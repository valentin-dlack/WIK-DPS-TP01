FROM alpine
RUN apk add nodejs npm
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY . /app
WORKDIR /app
RUN npm install

USER appuser
RUN npx tsc
EXPOSE 3000
CMD ["node", "build/index.js"]