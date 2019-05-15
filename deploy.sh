yarn build

mkdir dist

mv build dist/build

cp app.js dist/app.js
scp -r ./dist/* root@k.yijic.com:~/book/

rm -rf dist
