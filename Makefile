VERSION := $(shell yq e ".version" manifest.yaml)
ELECTRS_SRC := $(shell find ./electrs/src) electrs/Cargo.toml electrs/Cargo.lock
CONFIGURATOR_SRC := $(shell find ./configurator/src) configurator/Cargo.toml configurator/Cargo.lock
S9PK_PATH=$(shell find . -name electrs.s9pk -print)
TS_FILES := $(shell find . -name \*.ts )

.DELETE_ON_ERROR:

all: verify

verify: electrs.s9pk $(S9PK_PATH)
	embassy-sdk verify s9pk $(S9PK_PATH)

install: all electrs.s9pk
	embassy-cli package install electrs.s9pk

clean:
	rm -f image.tar
	rm -f electrs.s9pk

electrs.s9pk: manifest.yaml image.tar instructions.md scripts/embassy.js
	embassy-sdk pack

image.tar: Dockerfile check*.sh docker_entrypoint.sh configurator/target/aarch64-unknown-linux-musl/release/configurator $(ELECTRS_SRC)
	DOCKER_CLI_EXPERIMENTAL=enabled docker buildx build --tag start9/electrs/main:$(VERSION) --platform=linux/arm64 -o type=docker,dest=image.tar .

configurator/target/aarch64-unknown-linux-musl/release/configurator: $(CONFIGURATOR_SRC)
	docker run --rm -it -v ~/.cargo/registry:/root/.cargo/registry -v "$(shell pwd)"/configurator:/home/rust/src start9/rust-musl-cross:aarch64-musl cargo build --release

scripts/embassy.js: $(TS_FILES)
	deno bundle scripts/embassy.ts scripts/embassy.js
