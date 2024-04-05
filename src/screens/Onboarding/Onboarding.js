import React, { useContext } from "react"
import { StyleSheet, Text, SafeAreaView, ImageBackground, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { AuthContext}  from "../../contexts/AuthCont";


const Onboarding = ({ navigation }) => {

    const { signed } = useContext(AuthContext)

    return(
        <SafeAreaView style = {styles.container}>
            <ImageBackground source={require('../../../assets/apresentação_end.png')} style = {styles.img} />
            <LinearGradient
            // Button Linear Gradient
            colors={['rgba(5, 5, 5, 0.4)', 'rgba(5, 5, 5, 8)']}
            style={styles.grad}>
                <View style = {styles.logo}>
                    <Text style={styles.texth1}>Cloud Filmes</Text>
                </View>
                <View style = {styles.subtitulo}>
                    <Text style={styles.texth2}>Todos os seus Titulos favoritos. agora em um só Lugar.</Text>
                </View>
                <View style = {{width : '100%', alignItems : 'center'}}>
                    <TouchableOpacity style = {styles.buttonTeste} activeOpacity={0.5} onPress={() => navigation.navigate('Payment')} >
                        <Text style = {styles.textButton}>
                            Planos de Assinatura
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style = {{width : '100%', alignItems : 'center'}}>
                    <TouchableOpacity style = {styles.buttonConta} activeOpacity={0.6} onPress={() => navigation.navigate('Criar')}>
                        <Text style = {styles.textButton_conta}>
                            Criar Conta
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style = {{marginTop : 20}}>
                    <Text style = {{color : '#808080', fontSize : 17, fontWeight : '600'}} onPress={
                        () => navigation.navigate('Login')
                    } >Fazer Login</Text>
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'black'
    },
    img : {
        height : '95%'
    },
    grad : {
        width : '100%',
        height : '56%',
        position : 'absolute',
        bottom : 0,
        alignItems : 'center',
        justifyContent : 'center'
    },
    texth1 : {
        color : '#fff',
        fontSize : 42,
        fontWeight : '600',
        letterSpacing : 1
    },
    texth2 : {
        color : '#fff',
        fontSize : 20,
        fontWeight : '600',
        textAlign : 'center'
    },
    logo : {
        width : '100%',
        alignItems : 'center',
        //backgroundColor : 'blue'
    },
    subtitulo : {
        marginTop : 20,
        width : '100%',
        alignItems : 'center',
        //backgroundColor : 'blue',
    },
    buttonTeste : {
        margin : 30,
        height : 60,
        width : '78%',
        backgroundColor : '#50125D',
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 8
    },
    textButton : {
        fontSize : 20,
        color : '#fff'
    },
    buttonConta : {
        //margin : 5,
        height : 60,
        width : '78%',
        backgroundColor : 'black',
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 8,
        borderColor : "#50125D",
        borderWidth : 2
    },
    textButton_conta : {
        fontSize : 20,
        color : '#fff',
        fontWeight : '600'
    }
})


export default Onboarding

