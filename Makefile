VERSION := $(shell git describe --tags --abbrev=0)-xph
CHANNEL := latest
BUILD_DIR := packages/opencode
INSTALL_DIR := $(HOME)/.local/bin/usr
INSTALL_PATH := $(INSTALL_DIR)/ocv

.PHONY: all version build install clean

BINARY := $(BUILD_DIR)/dist/opencode-linux-x64/bin/opencode

all: build install

version:
	@echo "VERSION=$(VERSION) CHANNEL=$(CHANNEL)"
	@echo "BINARY=$(BINARY)"
	@echo "INSTALL_PATH=$(INSTALL_PATH)"

.PHONY: build
build: $(BINARY)

$(BINARY): node_modules
	bun install
	cd $(BUILD_DIR) && \
	OPENCODE_CHANNEL=$(CHANNEL) OPENCODE_VERSION=$(VERSION) \
	bun run build --single --skip-install

install: $(INSTALL_DIR) $(BINARY)
	cp $(BINARY) $(INSTALL_PATH).tmp
	mv $(INSTALL_PATH).tmp $(INSTALL_PATH)
	chmod +x $(INSTALL_PATH)

$(INSTALL_DIR):
	mkdir -p $(INSTALL_DIR)

clean:
	rm -rf $(BUILD_DIR)/dist
