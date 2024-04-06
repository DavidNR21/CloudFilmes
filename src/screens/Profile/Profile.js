import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Pressable, ScrollView } from 'react-native';
import * as Linking from 'expo-linking';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from '@rneui/base';
import { AuthContext } from '../../contexts/AuthCont'
import ModalNotificacao from '../../components/ModalNotify';


const ProfileScreen = ({ navigation }) => {

    const { test, conjunto, days, total } = useContext(AuthContext)
    const [modalVisible, setModalVisible] = useState(false);


    const clearAll = async () => {
        try {
          await AsyncStorage.clear()
        } catch(e) {
          // clear error
        }
      
        navigation.replace('Inicial')
    }


    const handleOpenWhatsApp = () => {
        const phoneNumber = "+5583986885083";
        Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
    };


    return (
        <SafeAreaView style = {styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>
                    Minha Conta
                </Text>
                <Icon name = 'search' size = {30} color = {'#fff'} style={{marginRight : 10}} onPress={() => navigation.navigate("Search")} />
            </View>
            <ScrollView contentContainerStyle = {{marginBottom : 20}}>

                <View style = {styles.viewBlock}>
                    <View style = {styles.box}>
                    <Icon type="material-community" name = 'email' size = {25} color = {'#fff'} style={{marginRight : 5, marginLeft : 8}} />
                    <Text style={{marginLeft : 5, fontSize : 15, color : '#fff'}}>
                        {`: ${test}`}
                    </Text>
                    </View>
                </View>

                <View style = {styles.viewBlock}>
                    <View style = {styles.box}>
                    <Icon type="material-community" name = 'credit-card-outline' size = {25} color = {'#fff'} style={{marginRight : 5, marginLeft : 8}} />
                    <Text style={{marginLeft : 4, fontSize : 15, color : '#fff'}}>
                        {`Ultimo Pagamento:  ${conjunto.Pagamento}`}
                    </Text>
                    </View>
                </View>

                <View style = {styles.viewBlock}>
                    <View style = {styles.box}>
                    <Icon type="material-community" name = 'counter' size = {25} color = {'#fff'} style={{marginRight : 5, marginLeft : 8}} />
                    <Text style={{marginLeft : 4, fontSize : 15, color : '#fff'}}>
                        {`Dias: ${days} restante(s)`}
                    </Text>
                    </View>
                </View>

                <View style = {styles.viewBlock}>
                    <View style = {styles.box}>
                    <Icon type="material-community" name = 'calendar' size = {25} color = {'#fff'} style={{marginRight : 5, marginLeft : 8}} />
                    <Text style={{marginLeft : 4, fontSize : 15, color : '#fff'}}>
                        {`Plano:  ${total} Dia(s)`}
                    </Text>
                    </View>
                </View>

                <View style = {styles.viewBlock}>
                    <Pressable style = {styles.box} onPress={() => setModalVisible(true)}>
                    <Icon type="material-community" name = 'bell-outline' size = {25} color = {'#fff'} style={{marginRight : 5, marginLeft : 8}} />
                    <Text style={{marginLeft : 4, fontSize : 15, color : '#fff'}}>
                        Notificações
                    </Text>
                    </Pressable>
                </View>

                <View style = {styles.infos}>
                    <Pressable style = {styles.infoBlocks} onPress={() => navigation.navigate('Payment')}>
                        <Text style = {styles.subText}>
                            Mudar Plano
                        </Text>
                    </Pressable>

                    <Pressable style = {styles.infoBlocks} onPress={handleOpenWhatsApp}>
                        <Text style = {styles.subText}>
                            Falar com o suporte
                        </Text>
                    </Pressable>

                    <Pressable style = {styles.infoBlocks} onPress={clearAll}>
                        <Text style = {styles.subText}>
                            Fazer Logout
                        </Text>
                    </Pressable>

                </View>

                <ModalNotificacao h={'titulo'} b={'body'} handleVi={modalVisible} handleSet={() => setModalVisible(!modalVisible)}/>

            </ScrollView>

        </SafeAreaView>
    )
}

//#121212

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#050505'
    },
    header : {
        width : '100%',
        padding: 10,
        backgroundColor: "#050505",
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
    },
    text : {
        fontSize : 24,
        fontWeight : '600',
        color : '#50125D',
        marginLeft : 5
    },
    viewBlock : {
        width : '100%',
        backgroundColor : '#050505',
        marginBottom : 5,
        height : 95
    },
    box : {
        height: 60,
        backgroundColor: '#141519',
        flexDirection: 'row',
        borderBottomColor : '#50125D',
        borderWidth : 4,
        borderRadius : 8,
        margin : 15,
        alignItems : 'center'
    },
    infos : {
        height : 'auto',
        marginTop : 5,
        width : '100%',
        backgroundColor : '#050505',
        alignItems : 'flex-end',
        justifyContent : 'center',
        flexDirection : 'column',
    },
    infoBlocks : {
        width : 240,
        height : 45,
        marginRight : 16,
        borderRadius : 8,
        backgroundColor : '#50125D',
        margin : 10,
        alignItems : 'center',
        justifyContent : 'center',
    },
    subText : {
        color : '#fff'
    }
})


export default ProfileScreen

