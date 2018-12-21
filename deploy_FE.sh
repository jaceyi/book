yarn build

rsync -avzP --delete ./build/* root@yijic.com:~/my-book/build/

rm -rf ./build
