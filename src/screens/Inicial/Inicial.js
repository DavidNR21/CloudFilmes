import React, { useState, useContext, useEffect } from "react"
import { View, StyleSheet, ActivityIndicator, Text, SafeAreaView, Alert} from "react-native"

import { AuthContext } from "../../contexts/AuthCont";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Inicial = ({ navigation }) =>{

    const { test, setTest, handleApi, conjunto} = useContext(AuthContext)

    async function Banco(){
        const value = await AsyncStorage.getItem('@CloudCineLogin');
        return value
    }

    useEffect(() => {
        Banco().then((t) =>{
            setTimeout(() => {
                if (t != null){
                    setTest(t)
                    navigation.replace('Root')
                }
                else{
                    navigation.replace('Auth')
                }
            }, 3500);
        })
    },[])


    return (
        <SafeAreaView style = {styles.container}>
            <View style = {{marginTop : 60, width : '100%', justifyContent : 'center', alignItems : 'center'}}>
                <Text style = {styles.logo}>
                    CloudFilmes
                </Text>
            </View>
            <View style = {styles.loading}>
                <ActivityIndicator size="large" color="purple" />
            </View>
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : 'black'
    },
    logo : {
        fontSize : 48,
        fontWeight : 'bold',
        color : "#fff",
        width : '100%',
        textAlign : 'center'
    },
    loading : {
        justifyContent : 'center',
        padding : 30,
        marginTop : 45
    }
})


export default Inicial


