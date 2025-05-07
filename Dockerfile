FROM node:22
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV VITE_PROXY_TARGET=http://localhost:8080
EXPOSE 5173

CMD ["npm", "run", "dev:proxy"]