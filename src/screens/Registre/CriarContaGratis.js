import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import Input from '../../components/Inputs';
import { CheckBox } from '@rneui/themed';


function CriarContaGratis({ navigation }) {

  const [checked, setChecked] = useState(false)
  const [isLoading, setloading] = useState(false)

  const toggleCheckbox = () => setChecked(!checked)

  return (
    <SafeAreaView style = {styles.container}>
      <View>
        <Text style = {styles.h1}>
          Starflix
        </Text>
        <Text style = {{color : '#fff', fontWeight : '600', textAlign : 'center', fontSize : 17, marginTop : 5}}>
          Teste gratis
        </Text>
      </View>
      <View style = {{marginVertical : 15}}>
        <Input
          placeholder = 'Email ou Nome de Usuario'
          placeholderTextColor={"#808080"}
          textAlign = 'left'
          textAlignVertical = 'center'
        />
        <Input
          placeholder = 'Senha'
          placeholderTextColor={"#808080"}
          textAlign = 'left'
          textAlignVertical = 'center'
          password
        />
        <Input
          placeholder = 'Confimar Senha'
          placeholderTextColor={"#808080"}
          textAlign = 'left'
          textAlignVertical = 'center'
          password
        />
      </View>
      <CheckBox 
        checked={checked}
        onPress={toggleCheckbox}
        iconType="material-community"
        checkedIcon="checkbox-outline"
        uncheckedIcon={'checkbox-blank-outline'}
        checkedColor = "#50125D"
        containerStyle = {{ width: "95%", backgroundColor : '#050505'}}
        title="Eu aceito os Termos e Condições e tambem a Politica de Privacidade"
        textStyle={{ color : '#fff'}}
      />
      <View style = {styles.viewCriar}>
        <Pressable style = {styles.criar}
          onPress={() => setloading(!isLoading)}
        >
          {
            isLoading ? (
              <ActivityIndicator size={"large"} color={"#fff"} />
              ) : (
                <Text style = {styles.textbutton}>
                   Criar Teste Gratis
                </Text>
              )
          }
        </Pressable>
      </View>
      <View style = {{flexDirection : 'row', marginTop : 20}}>
        <Text style = {{color : '#fff', fontSize : 17}} >Já possui uma conta?  </Text>
        <Text style = {{color : '#50125D', fontSize : 17, fontWeight : '600'}} onPress={() => {
          console.log('fazer login screen')
        }} >
          Fazer Login
        </Text>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#050505'
  },
  h1 : {
    color : '#fff',
    fontSize : 50,
    fontWeight : '600'
  },
  viewCriar : {
    width : '100%',
    height : 100,
    justifyContent : 'center',
    alignItems : 'center',
    //backgroundColor : 'blue'
  },
  criar : {
    backgroundColor : '#50125D',
    width : '80%',
    height : 65,
    borderRadius : 10,
    alignItems : 'center',
    justifyContent : 'center',
    borderColor : "#808080",
    borderWidth : 1
  },
  textbutton : {
    fontSize : 20,
    color : '#fff'
  },
})



export default CriarContaGratis;

//<View style = {styles.boxInput}>
//<TextInput style = {styles.input}
//placeholder = 'Email ou Nome de Usuario'
//placeholderTextColor={"#808080"}
//textAlign = 'left'
//textAlignVertical = 'center'
///>
//</View>import * as React from "react";
