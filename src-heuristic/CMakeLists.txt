
cmake_minimum_required(VERSION 3.20)

project(genetic_algorithm LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

# Shared compiler and linker options
add_library(project_options INTERFACE)

target_compile_options(project_options INTERFACE
    -g
    -Wall
    -Wextra
    -Wshadow
    -fsanitize=address,undefined
    -D_GLIBCXX_DEBUG
)

target_link_options(project_options INTERFACE
    -g
    -Wall
    -Wextra
    -Wshadow
    -fsanitize=address,undefined
    -D_GLIBCXX_DEBUG
)

# Main application
file(GLOB_RECURSE SRC_FILES CONFIGURE_DEPENDS
    "${CMAKE_CURRENT_SOURCE_DIR}/src/*.cpp"
)

add_executable(main ${SRC_FILES})

target_include_directories(main PRIVATE
    "${CMAKE_CURRENT_SOURCE_DIR}/include"
)

target_link_libraries(main PRIVATE project_options)

# GoogleTest (provided by your Nix environment)
find_package(GTest REQUIRED)

# Unit tests
enable_testing()

file(GLOB_RECURSE TEST_FILES CONFIGURE_DEPENDS
    "${CMAKE_CURRENT_SOURCE_DIR}/tests/*.cpp"
)

set(TEST_SUPPORT_SOURCES ${SRC_FILES})
list(FILTER TEST_SUPPORT_SOURCES EXCLUDE REGEX "/main\\.cpp$")

add_executable(unit_tests ${TEST_FILES} ${TEST_SUPPORT_SOURCES})

target_include_directories(unit_tests PRIVATE
    "${CMAKE_CURRENT_SOURCE_DIR}/include"
)

target_link_libraries(unit_tests PRIVATE
    GTest::gtest_main
    project_options
)

include(GoogleTest)
gtest_discover_tests(unit_tests)
