import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function WorkerStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={WorkerHomeScreen} />
      {/* Add more screens here if needed */}
    </Stack.Navigator>
  );
}

function ClientStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={ClientHomeScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Worker" component={WorkerStack} />
        <Tab.Screen name="Client" component={ClientStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
