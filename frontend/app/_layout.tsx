import { Stack } from "expo-router";

export default function RootLayout() {
  return (
  <Stack screenOptions={{headerShown:false}}>
  <Stack.Screen name="(tabs)"/>;
  <Stack.Screen name="CreateprojectScreen"/>;
  <Stack.Screen name="LoginScreen"/>;
  <Stack.Screen name="home"/>;
  <Stack.Screen name="Client/(tabs)"/>;
  <Stack.Screen name="Finance/(tabs)"/>;
  <Stack.Screen name="Manager/(tabs)"/>;
  <Stack.Screen name="QA/(tabs)"/>;
  <Stack.Screen name="sitesupevisor/(tabs)"/>;
  <Stack.Screen name="supplier/(tabs)"/>;
  <Stack.Screen name="worker/(tabs)"/>;
  
 <Stack.Screen name="LoginIntoExistingProject"/>
 </Stack>
);
}
