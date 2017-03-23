export PATH := node_modules/.bin:$(PATH)

NAME ?= hello-world
export BASE := build/$(NAME)

clean:
	rm -rf build

build/hello-world/original.js:
	mkdir -p ./build/hello-world
	cd hello-world; elm-make HelloWorld.elm --yes --output ../$(BASE)/original.js

build/elm-todomvc/original.js:
	mkdir -p ./build/elm-todomvc
	cd elm-todomvc; elm-make Todo.elm --yes --output ../$(BASE)/original.js

$(BASE)/prepared.js: $(BASE)/original.js
	babel $(BASE)/original.js -o $(BASE)/prepared.js

$(BASE)/uglified-beautified.js: $(BASE)/original.js
	uglifyjs $(BASE)/original.js -cb -o $(BASE)/uglified-beautified.js

$(BASE)/optimized-beautified.js: $(BASE)/prepared.js
	uglifyjs $(BASE)/prepared.js -cb -o $(BASE)/optimized-beautified.js

$(BASE)/uglified.js: $(BASE)/original.js
	uglifyjs $(BASE)/original.js -cm -o $(BASE)/uglified.js

$(BASE)/optimized.js: $(BASE)/prepared.js
	uglifyjs $(BASE)/prepared.js -cm -o $(BASE)/optimized.js

stats: $(BASE)/uglified.js $(BASE)/optimized.js
	./measure.sh $(BASE)/original.js $(BASE)/uglified.js $(BASE)/optimized.js | tee $(BASE)/stats.txt

all: $(BASE)/uglified-beautified.js $(BASE)/optimized-beautified.js $(BASE)/uglified.js $(BASE)/optimized.js