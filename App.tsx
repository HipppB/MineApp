import React from "react";
import ServerList from "./Views/ServerList";
import ServerDetailed from "./Views/ServerDetailed";
import Settings from "./Views/Settings";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={ServerList} />
        <Stack.Screen name="Server" component={ServerDetailed} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
