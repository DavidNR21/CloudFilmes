import React, { useState } from "react"
import { StyleSheet, Text, SafeAreaView, StatusBar } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native"

import Planos from "../screens/Pay/Planos";
import PixScreen from "../screens/Pay/Pix";


const PayStack = createNativeStackNavigator()

const PayRoutes = () => {
    return (
        <>
            <PayStack.Navigator initialRouteName="Planos">
                <PayStack.Screen name="Planos" component={Planos} options={{headerShown : false}} />
                <PayStack.Screen name="Pix" component={PixScreen} options={{headerShown : false}} />
            </PayStack.Navigator>
        </>
    )
}


export default PayRoutes

