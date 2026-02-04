#!/bin/sh

HOST="$1"

echo "⏳ Aguardando MySQL em $HOST:3306..."

until nc -z "$HOST" 3306; do
  sleep 2
done

echo "✅ MySQL disponível!"

echo "🚀 Rodando migrations..."
npx sequelize-cli db:migrate

echo "▶️ Iniciando API..."
npm run dev
