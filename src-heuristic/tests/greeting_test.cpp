#include <gtest/gtest.h>

#include <iostream>
#include <sstream>
#include <string>

#include "greeting.hpp"

TEST(GreetingTest, PrintsExpectedMessage) {
   EXPECT_EQ(make_greeting("Alice"), "Hello, Alice!"); 
}
