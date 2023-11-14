./src/scripts/start.sh & 

wget --spider -r -nd -nv -H -l 1 -w 2 -o logs/crawl.log  http://127.0.0.1:4321/index.html &