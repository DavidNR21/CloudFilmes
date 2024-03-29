import React, { useState, useContext, useEffect } from "react"
import { StyleSheet, Text, SafeAreaView, StatusBar, ActivityIndicator, View } from 'react-native'
import Toast from 'react-native-toast-message';

import MainNavigator from "./src/navigations/MainNavigator"
//import AuthRoutes from "./navigations/AuthsNavigator"
import { AuthContext } from "./src/contexts/AuthCont"
import AuthProvider from "./src/contexts/AuthCont"


export default function App() {

  const { signed, ToggleEmail } = useContext(AuthContext)

  
  return (
    <AuthProvider>
      <MainNavigator />
      <Toast />
    </AuthProvider>
  );
}


const styles = StyleSheet.create({
  container : {
      flex : 1,
      justifyContent : 'center',
      alignItems : 'center',
      backgroundColor : 'black'
  },
  logo : {
      fontSize : 52,
      fontWeight : 'bold',
      color : "#fff",
  },
  loading : {
      justifyContent : 'center',
      padding : 30,
      marginTop : 45
  }
})


