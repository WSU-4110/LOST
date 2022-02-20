import React from "react";
import { View, Text } from "react-native";
import { Link } from "react-router-native";
const Home = () => {
  return (
    <View >
    <Link to="/">
      <Text>Home</Text>
    </Link>
    <Link to="/search">
      <Text>Search Page</Text>
    </Link>
    <Link to="/musicplayer">
      <Text>Music Player Page</Text>
    </Link>
    <Link to="/error">
      <Text>Error Page</Text>
    </Link>
    <Link to="/settings">
      <Text>Settings Page</Text>
    </Link>
    <Link to="/loading">
      <Text>Loading Page</Text>
    </Link>
    <Link to="/auth">
      <Text>Authentication Page</Text>
    </Link>
</View>
  );
};

export default Home;
 