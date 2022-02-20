import React from "react";
import { View, Text } from "react-native";
import { Link } from "react-router-native";
const Search = () => {
  return (
    <View >
    <Text>This is the search page</Text>
    <Link to="/">
      <Text>Back to Home</Text>
    </Link>
</View>
  );
};

export default Search;
 