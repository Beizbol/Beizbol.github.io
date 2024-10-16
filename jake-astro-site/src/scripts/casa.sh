#! /bin/bash

tar -czvf jakesite.tar.gz -C dist .

scp jakesite.tar.gz jake@192.168.2.182:~/www