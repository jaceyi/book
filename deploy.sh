yarn build

mkdir dist

mv build dist/build

cp app.js dist/app.js
scp -r ./dist/* root@106.75.85.211:/data/book/

rm -rf dist
