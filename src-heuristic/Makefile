.PHONY: all configure build run test clean

BUILD_DIR := build
EXECUTABLE := $(BUILD_DIR)/main

all: build

configure:
	cmake -S . -B $(BUILD_DIR)

build: configure
	cmake --build $(BUILD_DIR) && cp $(BUILD_DIR)/compile_commands.json .

run: build
	./$(EXECUTABLE)

test: build
	ctest --test-dir $(BUILD_DIR) --output-on-failure

clean:
	cmake -E rm -rf $(BUILD_DIR)

