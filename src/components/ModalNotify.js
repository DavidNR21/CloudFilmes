import React, { useState, useContext, useEffect } from "react"
import { View, Text, Pressable, StyleSheet, TouchableOpacity, Image, Modal } from "react-native"
import { Icon } from "@rneui/base"

import { AuthContext } from "../contexts/AuthCont"
import { buscar_usuario_Email } from "../data/Apis"


const ModalNotificacao = ({ handleVi, handleSet, h, b }) => {

    const { test } = useContext(AuthContext)

    const [h1, setH1] = useState(h)
    const [body, setBody] = useState(b)

    const handleNotificacao = async () => {
        const notifyApi = await buscar_usuario_Email(test)

        if (notifyApi.data[0]['Notificacao'] == ''){
            setH1('')
            setBody('')
            
        }
        else{
            let jsonS = JSON.parse(notifyApi.data[0]['Notificacao'])

            setH1(jsonS.h1)
            setBody(jsonS.body)
        }
    }

    useEffect(() => {
        if (handleVi){
            handleNotificacao()
        }
        
    },[handleVi])

    
    return(
        <Modal animationType="fade"
        transparent={true}
        visible={handleVi}
        onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            handleSet;
        }}>
            <TouchableOpacity style={styles.centeredView} activeOpacity={1}>
                <View style = {styles.modalView}>
                    <View style = {{width : '100%', height : 45, backgroundColor : '#262626', alignItems : 'flex-end'}}>
                    <Icon type = "material-community" name = "close" size={30} color={'#fff'} style={{marginRight : 8, marginTop : 5}} onPress={handleSet} />
                    </View>

                    <View style = {{width : '100%', height : 60, backgroundColor : '#262626', alignItems : 'flex-start'}} >
                        <Text style = {{marginLeft : 5, fontSize : 20, color : '#fff'}} selectable selectionColor={'blue'}>
                            {`${h1}`}
                        </Text>
                    </View>

                    <View style = {{width : '100%', height : 380, backgroundColor : '#262626', alignItems : 'flex-start'}}>
                        <Text style = {{marginLeft : 5, fontSize : 16, color : '#fff'}} selectable selectionColor={'blue'}>
                            {`${body}`}
                        </Text>
                    </View>

                </View>

            </TouchableOpacity>
        </Modal>
    )
}

//ThumbUpOutline

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,

    },
    modalView: {
        backgroundColor : '#262626',
        margin: 20,
        width : '90%',
        height : 500,
        borderRadius: 12,
        shadowColor: '#000',
        zIndex : 9,
        justifyContent : 'flex-start',
        alignItems : 'center',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }
})

export default ModalNotificacao

