cd "$(dirname "$0")/src"
echo "Запуск node server.js"
node server.js &
cd ..
echo "Запуск gulp"
gulp
echo "Вдалося"
read -p 
