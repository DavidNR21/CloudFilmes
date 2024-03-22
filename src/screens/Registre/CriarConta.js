import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ActivityIndicator, Pressable, Alert, Keyboard } from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import Toast from 'react-native-toast-message';
import { auth } from "../../services/firebaseConfig"
import { Criar_Usuario } from "../../data/Apis";

//import AuthContext from '../../src/contexts/AuthCont';
import Input from "../../components/Inputs"
import { CheckBox } from '@rneui/themed';


function CriarConta({ navigation }) {

  const [checked, setChecked] = useState(false)
  const [isLoading, setloading] = useState(false)
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirme, setConfirme] = useState('')
  const [pay, setPay] = useState('')

  const toggleCheckbox = () => {
    setChecked(!checked)

    Alert.alert(
      'Criar Conta',
      'Voçe terá 2 dias de teste, assim que acabar terá que renovar a assinatura',
      [{text : 'ok'}]
    )

  }

  const data_atual = () => {

    const dataAtual = new Date();

    // Obter o dia, mês e ano
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Mês é baseado em zero
    const ano = dataAtual.getFullYear();

    const dataFormatada = `${ano}-${mes}-${dia}`

    setPay(dataFormatada)
  }


  const handleCriar = () => {
    setloading(!isLoading)
    Keyboard.dismiss()

    if (email != '' && senha != '' && confirme == senha && checked == true){
      createUserWithEmailAndPassword(auth, email.toLowerCase(), senha.toLowerCase())
      .then((userCredential) => {
        const user = userCredential.user;
        Criar_Usuario(user.uid, user.email.toLowerCase(), senha.toLowerCase(), pay) // criar user baserow
        setloading(false)

        sendEmailVerification(auth.currentUser)
        .then(() => {
          Alert.alert(
            'Foi Enviado um Link',
            'Verifique o seu email e click no link de autenticação',
            [{text : 'ok', onPress : () => navigation.navigate('Login')}]
          )
          
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        switch (errorCode){
          case 'auth/email-already-in-use':
            Alert.alert('Error','Email já esta em uso.')
            break
          case 'auth/invalid-email':
            Alert.alert('Error','Email invalido.')
            break
          case 'auth/weak-password':
            Alert.alert('Error','Digite uma senha forte.')
            break
          case 'auth/operation-not-allowed':
            Alert.alert('Error','Problemas ao cadastrar o usuario.')
            break
        }
        // ..
        setloading(false)
      });
    }
    else{
      Toast.show({
        type: 'error',
        text1: 'Credenciais Inconpletas',
        text2: 'Corrija os campos, para um email e senha validos, é necessario aceitar os termos',
        visibilityTime : 3000
      });

      setConfirme('')
      setEmail('')
      setSenha('')
      setloading(false)
    }
  }

  useEffect(() => {
    data_atual()
  },[])


  return (
    <SafeAreaView style = {styles.container}>
      <View>
        <Text style = {styles.h1}>
          Starflix
        </Text>
      </View>
      <View style = {{marginVertical : 15}}>
        <Input
          placeholder = 'Email'
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
        <Input
          placeholder = 'Confimar Senha'
          placeholderTextColor={"#808080"}
          textAlign = 'left'
          textAlignVertical = 'center'
          color = '#fff'
          value = {confirme}
          onChangeText = {(vale1) => setConfirme(vale1)}
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
          onPress={handleCriar}
        >
          {
            isLoading ? (
              <ActivityIndicator size={"large"} color={"#fff"} />
              ) : (
                <Text style = {styles.textbutton}>
                   Criar Conta
                </Text>
              )
          }
        </Pressable>
      </View>
      <View style = {{flexDirection : 'row', marginTop : 20}}>
        <Text style = {{color : '#fff', fontSize : 17}} >Já possui uma conta?  </Text>
        <Text style = {{color : '#50125D', fontSize : 17, fontWeight : '600'}} onPress={() => navigation.navigate('Login')} >
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
    width : '85%',
    height : 55,
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



export default CriarConta;

