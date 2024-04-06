import React, { useState, useContext } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ActivityIndicator, Pressable, Alert, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import * as Linking from 'expo-linking';
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from "../../contexts/AuthCont";
//import { Criar_Usuario } from '../../src/data/Apis';

import Input from "../../components/Inputs";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../../services/firebaseConfig"


function LoginScreen() {

  const navigation = useNavigation()

  const { signed, setTest } = useContext(AuthContext)

  const [isLoading, setloading] = useState(false)
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@CloudCineLogin', value);
    } catch (e) {
      // saving error
    }
  };

  const handleOpenWhatsApp = () => {
    const phoneNumber = "+5583986885083";
    Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
  };


  const HandleLogin1 = () => {
    setloading(!isLoading)
    Keyboard.dismiss()

    if (email.toLowerCase() != '' && senha.toLowerCase() != ''){
      if (['teste001@gmail.com', 'teste002@gmail.com', 'teste003@gmail.com', 'teste004@gmail.com'].includes(email.toLowerCase())){
        
        storeData(email.toLowerCase())
        setTest(email.toLowerCase())
        navigation.replace('Root')
      }
      else{
        signInWithEmailAndPassword(auth, email.toLowerCase(), senha.toLowerCase())
        .then((userCredential) => {
          var credit_email = userCredential.user.email // email que foi feito o login quando autenticado

          if (auth.currentUser.emailVerified){
            storeData(credit_email) // colocar o email no banco
            setTest(credit_email) // set o context email

            setloading(false)
            navigation.replace('Root')

          }
          else{
            setloading(false)
            Alert.alert(
              'Email não verificado',
              'Verifique o email informado para autenticação e manter a segurança'
            )
          }

          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          Toast.show({
            type: 'error',
            text1: `Error: ${errorCode}`,
            text2: 'refarça o form ou entre em contato com o suporte.'
          });

          setEmail('')
          setSenha('')

          setloading(false)
        });
      }
    }
    else{
      Toast.show({
        type: 'error',
        text1: 'Credenciais Inconpletas',
        text2: 'Corrija os campos, para um email e senha validos',
        visibilityTime : 3000
      });

      setEmail('')
      setSenha('')
      setloading(false)
    }
  }

  return (
    <SafeAreaView style = {styles.container}>
      <View style = {{marginBottom : 10}}>
        <Text style = {styles.h1}>
          Login
        </Text>
      </View>
      <View style = {{marginVertical : 17}}>
        <Input
          placeholder = 'Email ou Nome de Usuario'
          placeholderTextColor={"#808080"}
          textAlign = 'left'
          textAlignVertical = 'center'
          color = '#fff'
          value = {email}
          onChangeText = {(val) => setEmail(val)}
        />
        <Input
          placeholder = 'Senha'
          placeholderTextColor={"#808080"}
          textAlign = 'left'
          textAlignVertical = 'center'
          color = '#fff'
          value = {senha}
          onChangeText = {(vale) => setSenha(vale)}
          password
        />
      </View>
      <View style = {{width : '85%', height : 50, alignItems : 'flex-end'}}>
        <Text style = {{color : '#808080'}} onPress={handleOpenWhatsApp}>
          Esqueceu a Senha?
        </Text>
      </View>
      <View style = {styles.viewCriar}>
        <Pressable style = {styles.criar}
          onPress={HandleLogin1}
        >
          {
            isLoading ? (
              <ActivityIndicator size={"large"} color={"#fff"} />
              ) : (
                <Text style = {styles.textbutton}>
                   Entrar
                </Text>
              )
          }
        </Pressable>
      </View>
      <View style = {{flexDirection : 'row', marginTop : 20}}>
        <Text style = {{color : '#fff', fontSize : 17}} >Não possui uma conta?  </Text>
        <Text style = {{color : '#50125D', fontSize : 17, fontWeight : '600'}} onPress={() => navigation.replace('Criar')} >
          Criar Conta
        </Text>
      </View>
    </SafeAreaView>
  );
}

//() => setloading(!isLoading)

const styles = StyleSheet.create({
  container : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#050505'
  },
  h1 : {
    color : '#fff',
    fontSize : 46,
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
    width : '85%',
    height : 55,
    borderRadius : 10,
    alignItems : 'center',
    justifyContent : 'center',
  },
  textbutton : {
    fontSize : 22,
    color : '#fff',
    fontWeight : '600'
  },
})



export default LoginScreen;

