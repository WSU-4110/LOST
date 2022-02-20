import React from "react";
import { View, Text } from "react-native";
import { Link } from "react-router-native";
const Settings = () => {
  return (
    <View >
    <Text>This is the Settings page</Text>
    <Link to="/">
      <Text>Back to Home</Text>
    </Link>
</View>
  );
};

export default Settings;
 