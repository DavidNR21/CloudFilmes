import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './TabNavigator'
import Inicial from "../screens/Inicial/Inicial"
import AuthRoutes from './AuthsNavigator';
import PayRoutes from './PaymentNavigator';
import { StatusBar } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SeacrhScreen from '../screens/Search/Search';
import MovieScreen from '../screens/Details/MovieDetails';
import SeriesScreen from '../screens/Details/SerieDetails';
import SugestaoScreen from '../screens/Infos/Sugestoes';
import VerMais from '../screens/Infos/VerMais';
import PlayerScreen from '../screens/Player/Player';


const Stack = createNativeStackNavigator();


const MainNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle={'default'} />
      <Stack.Navigator initialRouteName='Inicial' >
        <Stack.Screen
          name="Inicial"
          component={Inicial}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Auth"
          component={AuthRoutes}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Payment"
          component={PayRoutes}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Root"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DetailsFilme"
          component={MovieScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DetailsSerie"
          component={SeriesScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Search"
          component={SeacrhScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Ver"
          component={VerMais}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Sugestao"
          component={SugestaoScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Player"
          component={PlayerScreen}
          options={{
            headerShown: false,
            orientation : 'landscape'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;