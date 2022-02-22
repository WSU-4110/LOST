import React from "react";
import { View, Text } from "react-native";
import { Link } from "react-router-native";
const Auth = () => {
  return (
    <View >
    <Text>This is the Authentication page</Text>
    <Link to="/">
      <Text>Back to Home</Text>
    </Link>
</View>
  );
};

export default Auth;
 