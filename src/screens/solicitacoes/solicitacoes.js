import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Pressable, Keyboard, ActivityIndicator, ScrollView} from 'react-native';
import Toast from 'react-native-toast-message';

import { Criar_Solicitacao } from '../../data/Apis';
import Input from '../../components/Inputs';
import { AuthContext } from '../../contexts/AuthCont'


const Solicitacoes = () => {

    const { test } = useContext(AuthContext)

    const handleSolicitacao = async (n, a) => {
        setloading(!isLoading)

        if (nome && ano != ''){
            const query = await Criar_Solicitacao(n, test, a)

            setloading(false)
            Keyboard.dismiss()

            Toast.show({
                type: 'success',
                text1: 'Solicitação',
                text2: `${n} foi solicitado com sucesso.`
            });
            setAno('')
            setNome('')
        }
        else {
            Toast.show({
                type: 'info',
                text1: 'Solicitação',
                text2: `Preenchar corretamente.`
            });
        }
    }

    const [nome, setNome] = useState('')
    const [ano, setAno] = useState('')
    const [isLoading, setloading] = useState(false)


    return (
        <SafeAreaView style = {styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.text}>
                        Solicitações
                    </Text>
                </View>


                <View style={styles.form}>
                    <View style={styles.inputs}>
                        <Input
                            placeholder='Nome ou uma breve descrição'
                            placeholderTextColor={"#808080"}
                            textAlign='left'
                            textAlignVertical='center'
                            color='#fff'
                            value={nome}
                            onChangeText={(val) => setNome(val)}
                        />
                    </View>

                    <View style={styles.inputs}>
                        <Input
                            placeholder='Ano de lancamento'
                            placeholderTextColor={"#808080"}
                            textAlign='left'
                            textAlignVertical='center'
                            color='#fff'
                            value={ano}
                            onChangeText={(val2) => setAno(val2)}
                        />
                    </View>

                    <View style={styles.viewText}>
                        <Text style={styles.textInfo} >
                            As solicitações depois de enviadas podem demorar alguns dias até serem feitas ou avaliadas,
                            verifique as notificações no perfil para saber se sua solicitação foi feita.
                        </Text>
                    </View>

                    <View style={styles.viewCriar}>
                        <Pressable style={styles.criar} onPress={() => handleSolicitacao(nome, ano)}>
                            {
                                isLoading ? (
                                    <ActivityIndicator size={"large"} color={"#fff"} />
                                ) : (
                                    <Text style={styles.textbutton}>
                                        Fazer solicitação
                                    </Text>
                                )
                            }
                        </Pressable>
                    </View>

                </View>
            </ScrollView>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#050505'
    },
    header : {
        width : '100%',
        height : 70,
        backgroundColor : '#050505',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        borderBottomColor : '#262626',
        borderWidth : 4
    },
    text : {
        fontSize : 24,
        fontWeight : '600',
        color : '#50125D'
    },
    form : {
        width : '100%',
        flexDirection : 'column',
        marginTop : 20
    },
    inputs : {
        width : '100%',
        marginBottom : 10
    },
    viewText : {
        marginTop : 5,
        width : '96%',
        alignItems : 'center',
        justifyContent : 'center'
    },
    textInfo : {
        color : '#858585',
        fontSize : 16,
        fontWeight : '400',
        textAlign : 'center',
        width : '100%'
    },
    viewCriar : {
        width : '100%',
        height : 100,
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 15
    },
    criar : {
        backgroundColor : '#50125D',
        width : '85%',
        height : 60,
        borderRadius : 10,
        alignItems : 'center',
        justifyContent : 'center',
        borderColor : "#808080",
        borderWidth : 1
    },
    textbutton : {
        fontSize : 18,
        color : '#fff'
    },
})


export default Solicitacoes

