import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Solicitacoes from '../screens/solicitacoes/solicitacoes';

const Stack = createNativeStackNavigator();


const SolicitacoesNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SolicitacoesScreen"
        component={Solicitacoes}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default SolicitacoesNavigator;
