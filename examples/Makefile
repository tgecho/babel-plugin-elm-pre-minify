# In addition to running `yarn install` first, you'll need zopfli and closure-compiler on your system to complete
# To get stats, run with the name of the example you want to see: `make stats NAME=hello-world`

export PATH := node_modules/.bin:$(PATH)

NAME ?= hello-world
export BASE := build/$(NAME)

clean:
	rm -rf build

original: $(BASE)/original.js
prepared: $(BASE)/prepared.js
beautified: $(BASE)/optimized-beautified.js

build/hello-world/original.js:
	mkdir -p ./build/hello-world
	cd hello-world; elm-make HelloWorld.elm --yes --output ../$(BASE)/original.js

build/elm-todomvc/original.js:
	mkdir -p ./build/elm-todomvc
	cd elm-todomvc; elm-make Todo.elm --yes --output ../$(BASE)/original.js

build/kitchen-sink/original.js:
	mkdir -p ./build/kitchen-sink
	cd kitchen-sink; elm-make KitchenSink.elm --yes --output ../$(BASE)/original.js

build/elm-street-404/original.js:
	mkdir -p ./build/elm-street-404
	cd elm-street-404; elm-make src/Main.elm --yes --output ../$(BASE)/original.js

build/game2048elm/original.js:
	mkdir -p ./build/game2048elm
	cd game2048elm; elm-make src/Game2048.elm --yes --output ../$(BASE)/original.js

$(BASE)/prepared.js: $(BASE)/original.js
	BABEL_ENV=prepared babel $(BASE)/original.js -o $(BASE)/prepared.js

$(BASE)/uglify-beautified.js: $(BASE)/original.js
	uglifyjs $(BASE)/original.js -cb -o $(BASE)/uglify-beautified.js

$(BASE)/optimized-beautified.js: $(BASE)/prepared.js
	uglifyjs $(BASE)/prepared.js -cb -o $(BASE)/optimized-beautified.js

$(BASE)/vanilla-uglify.js: $(BASE)/original.js
	uglifyjs $(BASE)/original.js -cm -o $(BASE)/vanilla-uglify.js

$(BASE)/optimized-uglify.js: $(BASE)/prepared.js
	uglifyjs $(BASE)/prepared.js -cm -o $(BASE)/optimized-uglify.js

$(BASE)/vanilla-closure.js: $(BASE)/original.js
	closure-compiler --compilation_level ADVANCED_OPTIMIZATIONS $(BASE)/original.js > $(BASE)/vanilla-closure.js

$(BASE)/optimized-closure.js: $(BASE)/prepared.js
	closure-compiler --compilation_level ADVANCED_OPTIMIZATIONS $(BASE)/prepared.js > $(BASE)/optimized-closure.js

$(BASE)/vanilla-babili.js: $(BASE)/original.js
	BABEL_ENV=vanilla-babili babel $(BASE)/original.js -o $(BASE)/vanilla-babili.js

$(BASE)/optimized-babili.js: $(BASE)/original.js
	BABEL_ENV=optimized-babili babel $(BASE)/original.js -o $(BASE)/optimized-babili.js

stats: \
		$(BASE)/vanilla-babili.js \
		$(BASE)/vanilla-uglify.js \
		$(BASE)/vanilla-closure.js \
		$(BASE)/optimized-babili.js \
		$(BASE)/optimized-closure.js \
		$(BASE)/optimized-uglify.js

	./measure.sh $(BASE)/original.js \
		$(BASE)/vanilla-babili.js \
		$(BASE)/vanilla-uglify.js \
		$(BASE)/vanilla-closure.js \
		$(BASE)/optimized-babili.js \
		$(BASE)/optimized-closure.js \
		$(BASE)/optimized-uglify.js \
		| tee $(BASE)/stats.txt

all: $(BASE)/uglify-beautified.js $(BASE)/optimized-beautified.js $(BASE)/vanilla-uglify.js $(BASE)/optimized-uglify.js