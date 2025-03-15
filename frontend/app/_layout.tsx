import { Stack } from "expo-router";

export default function RootLayout() {
  return (
  <Stack screenOptions={{headerShown:false}}>
  <Stack.Screen name="(tabs)" />;
  <Stack.Screen name="CreateprojectScreen"/>;
  <Stack.Screen name="LoginScreen"/>;
  <Stack.Screen name="home"/>;
  
 <Stack.Screen name="LoginIntoExistingProject"/>
 </Stack>
);
}
