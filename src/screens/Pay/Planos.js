import React, { useEffect, useState, useContext } from "react";
import { View, SafeAreaView, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import { Icon } from "@rneui/base";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../../contexts/AuthCont";


const Planos = () => {

    const { test } = useContext(AuthContext)

    const { height, width } = Dimensions.get('window')
    const navigation = useNavigation()

    function generateRandomString() {
        var characters = '0123456789abcdef';
        var stringLength = 36; // Comprimento da string UUID
        var customString = '0d';
    
        for (var i = 0; i < stringLength; i++) {
            if (i === 8 || i === 13 || i === 18 || i === 23) {
                customString += '-';
            } else if (i === 35) {
                customString += 'p';
            } else {
                var randomIndex = Math.floor(Math.random() * characters.length);
                customString += characters[randomIndex];
            }
        }
    
        return customString;
    }

    const verify = async () => {
        if(test.length > 3){
            try {
                const response = await fetch('https://api.mercadopago.com/v1/payments', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json', //0dac7e31a2-5c60-ff30-0a0e-00d0b21b4dbp
                    'X-Idempotency-Key': '0d5020ed-1af6-469c-ae06-c3bec19954bp',
                    'Authorization': 'Bearer APP_USR-38498156768544-021419-530b09f1b1a848b43fe205160e062be5-577050871'
                  },
                  body: JSON.stringify({
                    "description" : "Assinatura Premium",
                    "transaction_amount" : 6.50,
                    "payment_method_id" : "pix",
                    "payer" : {
                        "email" : `${test}`,
                        "first_name": "Cliente",
                        "last_name": "sicrano",
                        "identification" : {
                            "type" : "CPF",
                            "number" : "95749019047"
                        }
                    }
                  })
                });
              
                if (!response) {
                  throw new Error('Erro ao fazer a solicitação.');
                }
    
                const data = await response.json();
                console.log(data.point_of_interaction.transaction_data);
    
                console.log('==================================================================')
                console.log(generateRandomString());
                navigation.navigate('Pix', {
                    Id : data.id,
                    qr_copia : data.point_of_interaction.transaction_data.qr_code,
                    qr_base64 : data.point_of_interaction.transaction_data.qr_code_base64
                })
            
            } catch (error) {
                console.error('Erro:', error);
            }
            
        }
        else{
            console.log('nao verify')
            Toast.show({
                type: 'info',
                text1: 'Pagamento',
                text2: `Não possui um email no app.`
            });
        }

    }


    return(
        <SafeAreaView style = {styles.container}>

            <View style={{ width: '100%', borderBottomColor: '#50125D', borderWidth: 2 }}>
                <View style={styles.header}>
                    <Text style={{ color: '#fff', fontSize: 24, fontWeight : '500' }}>
                        Planos
                    </Text>
                </View>
            </View>

            <View style = {{marginTop : 15, width : '100%', alignItems : 'center', justifyContent : 'center'}}>
                <Text style = {{color : '#fff', textAlign : 'center', fontSize : 18}}>
                    Bem-vindo, esse é o plano de Assinatura do app, mas se não quiser fazer um plano agora
                    voçe possui 2 DIAS DE TESTE GRATIS, sem anuncios, volte e crie uma conta, e assim que acaba
                    voçe escolhe se quer continuar ou não, sem cartão, o Pagamento é por PIX.
                </Text>
            </View>

            <View style = {{marginTop : 40, alignItems : 'center', width : '100%', height : (parseInt(height) - 370)}}>
                <Pressable style = {styles.plan} onPress={verify}>
                    <Icon type='material-community' name='crown-outline' size={55} color={'#fff'} />

                    <View style = {styles.price}>
                        <Text style = {{color : '#fff', fontSize : 27}}>
                            R$ 6,50
                        </Text>

                        <Text style = {{marginLeft : 10, color : '#fff', fontSize : 20}}>
                            ,por 45 dias
                        </Text>
                    </View>

                    <Text style = {{marginTop : 12, color : '#fff', fontSize : 15}}>
                        Pagamento via Pix, seguro e rápido
                    </Text>

                    <View style = {{flexDirection : 'row', marginTop : 12, alignItems : 'center', justifyContent : 'center', width : '100%'}}>
                        <Icon type='material-community' name='movie' size={35} color={'#808080'} />
                        <Text style = {{marginLeft : 10, color : '#808080', fontSize : 15}}>
                            +1000 Filme,Series, Animes
                        </Text>
                    </View>

                    <View style = {{height : 60, width : 290, flexDirection : 'row', marginTop : 15, alignItems : 'center', justifyContent : 'center', borderColor : '#50125D', borderWidth : 2, borderRadius : 8}}>
                        <Text style = {{color : '#fff', fontSize : 16}}>
                            Click aqui para assinar
                        </Text>
                    </View>

                    <View style = {{flexDirection : 'row', marginTop : 12, alignItems : 'center', justifyContent : 'center', width : '100%'}}>
                        <Text style = {{marginLeft : 10, color : '#808080', fontSize : 15}}>
                            Site exclusivo para assinantes, PC e Tv
                        </Text>
                    </View>

                    <View style = {{flexDirection : 'row', marginTop : 5, alignItems : 'center', height : 90}}>
                        <Text style = {{color : '#fff', fontSize : 16, textAlign : 'center'}}>
                            Precisa criar uma conta gratis antes de assinar, se já possui prossiga.
                        </Text>
                    </View>

                </Pressable>
            </View>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#050505',
    },
    header : {
        height : 65,
        alignItems : 'center',
        width : '100%',
        flexDirection : 'row',
        justifyContent : 'center'
    },
    plan : {
        height : '100%',
        width : '90%',
        backgroundColor : 'black',
        justifyContent : 'space-evenly',
        alignItems : 'center',
        borderRadius : 8,
        borderColor : "#50125D",
        borderWidth : 2
    },
    price : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        width : '100%',
    }
})


export default Planos
