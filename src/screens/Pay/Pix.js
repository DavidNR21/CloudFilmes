import React, { useState, useEffect, useContext } from "react";
import { View, SafeAreaView, Text, StyleSheet, Pressable, Image, Dimensions, ScrollView, ActivityIndicator } from "react-native";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

import { paymentVerify, atualizar_Usuario } from "../../data/Apis";
import Input from '../../components/Inputs'
import { AuthContext } from "../../contexts/AuthCont";
import Toast from "react-native-toast-message";


const PixScreen = ({ route }) => {

    const { test, signed, conjunto, setSigned } = useContext(AuthContext)
    const { height, width } = Dimensions.get('window')

    const idpix = route.params.Id
    const [status, setStatus] = useState('Pending')
    const qrText = route.params.qr_copia
    const [loading, setLoading] = useState(true)
    const qrcode = route.params.qr_base64

    const navigation = useNavigation()


    const checkPaymentStatus = async () => {

        const dataAtual = new Date();

        // Obter o dia, mês e ano
        const dia = String(dataAtual.getDate()).padStart(2, '0');
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Mês é baseado em zero
        const ano = dataAtual.getFullYear();

        const dataFormatada = `${ano}-${mes}-${dia}`

        const payApi = await paymentVerify(idpix);
        console.log(dataFormatada, idpix, ' idPix')

        if (payApi.status === 200 && payApi.data === 'approved') {
            const updUser = await atualizar_Usuario(conjunto.id, dataFormatada)

            console.log(payApi.status, payApi.data, payApi.success);
            setStatus(payApi.data)
            setSigned(true)
            Toast.show({
                type: 'success',
                text1: 'Pagamento',
                text2: `Foi feito com sucesso, atualizando...`,
                onHide : () => navigation.replace('Root')
            });
        } else {
            Toast.show({
                type: 'info',
                text1: 'Pagamento',
                text2: `Ainda não foi pago, verifique novamente...`,
            });
            console.log('O pagamento ainda não foi aprovado. Tentando novamente em 5 segundos...');
        }
    };


    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2500)
        console.log(idpix, signed, conjunto.id)
    },[])


    return(
        <SafeAreaView style = {styles.container}>

            <View style={styles.header}>
                <Pressable style = {{marginLeft : 20}} onPress={() => navigation.goBack()}>     
                    <Icon name='arrow-back' size={35} color={'#fff'} />
                </Pressable>
            </View>

            {loading ? (
                <View style = {{height : (parseInt(height) - 110), justifyContent : 'center'}}>
                    <ActivityIndicator size={'large'} color={'purple'} />
                </View>
            ) : (
                <>
                    <ScrollView contentContainerStyle = {{width : '100%', marginBottom : 15, alignItems : 'center', justifyContent : 'center'}}>
                            <View style={{ alignItems: 'center', width: '100%', height: (parseInt(height - 80)) }}>
                                <View style = {styles.qrPix}>
                                    <Image style={{width : '100%', height : '100%'}} source={{uri: `data:image/png;base64,${qrcode}`}} />
                                </View>

                                <Text style={{ marginTop: 5, color: '#fff' }}>
                                    {`Id Pix: ${idpix}`}
                                </Text>

                                <View style={{ height: 'auto', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Pressable style={styles.statu}>
                                        <Text style={{ color: '#fff', fontSize: 18 }}>
                                            {`Status:  -   ${status}   -`}
                                        </Text>
                                    </Pressable>

                                    <Pressable style={styles.statu}>
                                        <Text style={{ color: '#fff', fontSize: 18 }}>
                                            {`Preço: R$ 6,50 (Plano de 45 dias)`}
                                        </Text>
                                    </Pressable>

                                    <Input
                                        //placeholder = 'Digite aqui...'
                                        placeholderTextColor={"#808080"}
                                        textAlign='left'
                                        textAlignVertical='center'
                                        color='#808080'
                                        value={qrText}
                                    />

                                    <Pressable style={styles.texts} >
                                        <Text style={{ color: '#fff', fontSize: 14, marginLeft: 10 }}>
                                            Aviso Legal: Se houver algum problema entre em contato com o suporte,
                                            pode demorar um pouco dependendo da internet, mas assim que for feito o pagamento,
                                            voçe será levado para a tela principal, NÃO FECHE O APP.
                                        </Text>
                                    </Pressable>


                                    <Pressable onPress={() => checkPaymentStatus(idpix)} style={{ borderRadius: 8, backgroundColor: '#50125D', justifyContent: 'center', alignItems: 'center', height: 45, marginTop: 15, width: 300 }}>
                                        <Text style={{ color: '#fff', fontSize: 16 }}>
                                            Verificar Pix
                                        </Text>
                                    </Pressable>

                                </View>

                            </View>
                    </ScrollView>
                </>
            )}


        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#050505',
    },
    header : {
        height : 70,
        width: '100%',
        flexDirection : 'row',
        alignItems : 'center',
        backgroundColor : '#050505'
    },
    qrPix : {
        width : 300,
        height : 300,
        backgroundColor : 'gray',
        borderColor : '#50125D',
        borderWidth : 2
    },
    statu : {
        width : 'auto',
        height : 45,
        marginTop : 10,
        alignItems : 'flex-start',
        justifyContent : 'flex-start',
        flexDirection : 'row',
        marginBottom : 8
    },
    texts : {
        width : '100%',
        marginTop : 8,
    }
})

export default PixScreen

