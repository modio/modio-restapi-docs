
ENVIRONMENT?=dev
SHELL=/bin/bash

.PHONY: build clean deploy-into-modio-docs

clean:
	rm -rf restapi_docs_platform_output

build:
	bundle exec middleman build --clean

deploy-into-modio-docs: clean build
	./create-slate-output.sh $(ENVIRONMENT)
