import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExplorarScreen from "../screens/Explorar/ExplorarScreen";

const Stack = createNativeStackNavigator();


const ExplorarNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchScreen"
        component={ExplorarScreen}
        options={{
          headerShown: false,
          useNativeDriver: true,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ExplorarNavigator;