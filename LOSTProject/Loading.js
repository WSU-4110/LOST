import React from "react";
import { View, Text } from "react-native";
import { Link } from "react-router-native";
const Loading = () => {
  return (
    <View >
    <Text>This is the Loading page</Text>
    <Link to="/">
      <Text>Back to Home</Text>
    </Link>
</View>
  );
};

export default Loading;
 