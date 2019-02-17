yarn build

mkdir dist

mv build dist/build

cp app.js dist/app.js
rsync -avzP --delete ./dist/* root@yijic.com:~/book/

rm -rf dist
