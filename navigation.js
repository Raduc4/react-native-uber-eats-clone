import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RestaurantDetail from "./screens/RestaurantDetail";
import Home from "./screens/Home";

export default function RootNavigation() {
  const Stack = createNativeStackNavigator();

  const screenOptions = {
    headerShown: false,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
