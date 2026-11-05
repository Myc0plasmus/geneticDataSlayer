#include <thread>
#include <chrono>

#include "mock_computation.hpp"

std::string mock_computation(const std::string& name)
{
	std::this_thread::sleep_for(std::chrono::seconds(5));
    return "Hello, " + name + "!";
}
