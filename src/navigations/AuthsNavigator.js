import React, { useState } from "react"
import { StyleSheet, Text, SafeAreaView, StatusBar } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native"

import CriarConta from "../screens/Registre/CriarConta";
import LoginScreen from "../screens/Login/LoginScreen";
import Onboarding from "../screens/Onboarding/Onboarding"


const AuthStack = createNativeStackNavigator()


const AuthRoutes = () => {
    return (
        <>
            <AuthStack.Navigator initialRouteName="Onboard">
                <AuthStack.Screen name="Onboard" component={Onboarding} options={{headerShown : false}} />
                <AuthStack.Screen name="Criar" component={CriarConta} options={{headerShown : false}} />
                <AuthStack.Screen name="Login" component={LoginScreen} options={{headerShown : false}} />
            </AuthStack.Navigator>
        </>
    )
}


export default AuthRoutes

