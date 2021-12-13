sudo chmod -R 777 /home/ubuntu/dissoku-nuxt
cd /home/ubuntu/dissoku-nuxt
sudo rm -rf node_modules
npm install
pm2 restart all