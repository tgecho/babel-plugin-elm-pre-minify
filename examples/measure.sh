#!/usr/bin/env sh
set -e

result="file	raw	gzip	zopfli\n"
for path in "$@"
do
    result+="$(basename $path)	$(cat $path | wc -c | xargs)	$(gzip -c $path | wc -c | xargs)	$(zopfli -c $path | wc -c | xargs)\n"
done
echo $result | column -t
