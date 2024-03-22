import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FavoriteNavigator from './FavoriteNavigator';
import HomeNavigator from './HomeNavigator';
import ExplorarNavigator from './ExplorarNavigator';
import SolicitacoesNavigator from './SolicitacoesNavigator';
import ProfileNavigator from './ProfileNavigator';

import { Icon } from '@rneui/base';


const tabs = [
  {
    name: 'Home',
    screen: HomeNavigator,
  },
  {
    name: 'Explorar',
    screen: ExplorarNavigator,
  },
  {
    name: 'Favorite',
    screen: FavoriteNavigator,
  },
  {
    name: 'Solicitacoes',
    screen: SolicitacoesNavigator,
  },
  {
    name : 'Profile',
    screen : ProfileNavigator,
  }
];


const Tab = createBottomTabNavigator();



const TabNavigator = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor : '#50125D',
          tabBarInactiveTintColor : '#fff',
          tabBarStyle : {
            paddingBottom : 5,
            paddingTop : 5,
            backgroundColor : '#050505',
            borderTopColor : 'transparent'
          }
        }}>
          <Tab.Screen
            key={'Home'}
            name={'Home'}
            component={HomeNavigator}
            options={{
              headerShown : false,
              tabBarShowLabel : false,
              tabBarIcon : ({ color, size, focused }) => {
                if(focused) {
                  return <Icon type="material-community" name = 'home' size = {size+10} color = {color}/>
                }
                
                return <Icon type="material-community" name = 'home-outline' size = {size+5} color = {color}/>
              }
            }}
          />
          <Tab.Screen
            key={'Explorar'}
            name={'Explorar'}
            component={ExplorarNavigator}
            options={{
              headerShown : false,
              tabBarShowLabel : false,
              tabBarIcon : ({ color, size, focused }) => {
                if(focused) {
                  return <Icon type="material-community" name = 'layers' size = {size+10} color = {color}/>
                }
                
                return <Icon type="material-community" name = 'layers-outline' size = {size+5} color = {color}/>
              }
            }}
          />
          <Tab.Screen
            key={'Favorite'}
            name={'Favorite'}
            component={FavoriteNavigator}
            options={{
              headerShown : false,
              tabBarShowLabel : false,
              tabBarIcon : ({ color, size, focused }) => {
                if(focused) {
                  return <Icon type="material-community" name = 'heart' size = {size+10} color = {color}/>
                }
                
                return <Icon type="material-community" name = 'heart-outline' size = {size+5} color = {color}/>
              }
            }}
          />
          <Tab.Screen
            key={'Solicitacoes'}
            name={'Solicitacoes'}
            component={SolicitacoesNavigator}
            options={{
              headerShown : false,
              tabBarShowLabel : false,
              tabBarIcon : ({ color, size, focused }) => {
                if(focused) {
                  return <Icon type="material-community" name = 'comment' size = {size+10} color = {color}/>
                }
                
                return <Icon type="material-community" name = 'comment-outline' size = {size+5} color = {color}/>
              }
            }}
          />
          <Tab.Screen
            key={'Profile'}
            name={'Profile'}
            component={ProfileNavigator}
            options={{
              headerShown : false,
              tabBarShowLabel : false,
              tabBarIcon : ({ color, size, focused }) => {
                if(focused) {
                  return <Icon type="material-community" name = 'account' size = {size+10} color = {color}/>
                }
                
                return <Icon type="material-community" name = 'account-outline' size = {size+5} color = {color}/>
              }
            }}
          />
      </Tab.Navigator>
    </>
  );
};


export default TabNavigator;