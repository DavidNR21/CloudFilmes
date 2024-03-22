import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import Input from '../../components/Inputs';


function MudarSenha({ navigation }) {

  return (
    <SafeAreaView style = {styles.container}>
        <View style = {{marginTop : 25}}>
            <Input 
             placeholder = 'Email para recuperação'
             placeholderTextColor={"#808080"}
             textAlign = 'left'
             textAlignVertical = 'center'
            />
        </View>
        <View style = {styles.viewText}>
            <Text style = {styles.texth2}>
            Caso a conta não exista, um e-mail de redefinação de senha será enviado para o endereço atrelado a conta
            </Text>
        </View>
        <View style = {{width : '100%', alignItems : 'center', marginTop : 50}}>
            <TouchableOpacity style = {styles.buttonConta} activeOpacity={0.6} onPress={() => navigation.goBack()}>
                <Text style = {styles.textButton_conta}>
                    Enviar Link de Recuperação
                </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "#050505"
    },
    viewText : {
        width : '90%',
        alignItems : 'center',
        textAlign : 'center',
        justifyContent : 'center',
        margin : 10
    },
    texth2 : {
        fontSize : 16,
        fontWeight : '500',
        textAlign : 'center',
        marginLeft : 20,
        color : '#fff'
    },
    buttonConta : {
        height : 55,
        width : '80%',
        backgroundColor : 'black',
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 8,
        borderColor : "#50125D",
        borderWidth : 2
    },
    textButton_conta : {
        fontSize : 17,
        color : '#fff',
        fontWeight : '600'
    }
})


export default MudarSenha;

