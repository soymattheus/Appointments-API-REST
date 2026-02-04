FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN chmod +x wait-for.sh

EXPOSE 9891

CMD ["./wait-for.sh", "service-mysql"]
