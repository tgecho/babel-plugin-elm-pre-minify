These stats are generated from the examples directory, and can be reproduced by following the instructions in the Makefile. The optimized.


## [hello-world](hello-world)

```
file                  raw     gzip   zopfli
original.js           178612  37579  35483
vanilla-babili.js     76342   22318  21552
vanilla-uglify.js     67822   20161  19443
vanilla-closure.js    59563   18760  18110
optimized-babili.js   67740   18977  18187
optimized-closure.js  48952   15050  14505
optimized-uglify.js   22265   7876   7660
```


## [elm-todomvc](https://github.com/evancz/elm-todomvc)

```
file                  raw     gzip   zopfli
original.js           228750  43995  41480
vanilla-babili.js     89261   25298  24341
vanilla-uglify.js     80394   23163  22276
vanilla-closure.js    71191   21981  21186
optimized-babili.js   80199   21912  21011
optimized-closure.js  60971   18574  17919
optimized-uglify.js   39882   12773  12319
```


## [elm-street-404](https://github.com/zalando/elm-street-404)

```
file                  raw     gzip   zopfli
original.js           496671  88246  82596
vanilla-babili.js     171908  47390  45513
vanilla-uglify.js     155826  43115  41539
optimized-babili.js   162975  44049  42230
vanilla-closure.js    133832  40311  38818
optimized-closure.js  122767  36445  35111
optimized-uglify.js   117373  32435  31183
```


## [game2048elm](https://github.com/zindel/game2048elm)

```
file                  raw     gzip   zopfli
original.js           309511  58192  54515
vanilla-babili.js     115261  32420  31205
vanilla-uglify.js     103863  29507  28425
optimized-babili.js   106105  28934  27754
vanilla-closure.js    90027   27849  26762
optimized-closure.js  78954   23631  22747
optimized-uglify.js   69724   20093  19329
```


## [kite](https://github.com/erkal/kite)
```
file                  raw     gzip    zopfli
original.js           835706  144236  134372
vanilla-babili.js     351616  93988   89108
optimized-babili.js   342618  91665   86556
vanilla-uglify.js     332420  88124   83412
vanilla-closure.js    296657  85551   80489
optimized-closure.js  285541  81814   77129
optimized-uglify.js   262017  74930   69855
```