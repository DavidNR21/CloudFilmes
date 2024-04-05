import React, { useState } from "react"
import { View, Text, Pressable, StyleSheet, TouchableOpacity, Image, Modal } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Toast from "react-native-toast-message"

import { Icon } from "@rneui/base"


const ModalAssistidos = ({ handleVi, handleSet, obj }) => {

    const togglehistory = async () => {
        try {
            const histotyMovies = await AsyncStorage.getItem("histotyMovies");
            let histotyMoviesArray = histotyMovies ? JSON.parse(histotyMovies) : [];

            await AsyncStorage.setItem("histotyMovies",JSON.stringify(histotyMoviesArray));
            // If movie is already saved, remove it from the list
            const updatedhistotyMoviesArray = histotyMoviesArray.filter(
                (savedMovie) => savedMovie.id !== obj.Nome
            );
            await AsyncStorage.setItem("histotyMovies",JSON.stringify(updatedhistotyMoviesArray));
            Toast.show({
                type: 'success',
                text1: 'Historico',
                text2: `${obj.Nome} já foi excluido, atualize se necessario.`,
                visibilityTime : 3000
            });

        } catch (error) {
          console.log("Error Saving Movie", error);
        }
    };


    return(
        <Modal animationType="fade"
        transparent={true}
        visible={handleVi}
        onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            handleSet;
        }}>
            <TouchableOpacity style={styles.centeredView} activeOpacity={0.8} onPress={handleSet} />
            <View style={styles.modalView}>
                <View style = {styles.LineInfos}>
                    <Text style = {styles.textTitulo} numberOfLines={1} ellipsizeMode = 'tail' >
                        {obj?.Nome}
                    </Text>
                    <Icon type = "material-community" name = "close" size={30} color={'#fff'} style={{marginRight : 8, marginTop : 5}} onPress={handleSet} />
                </View>
                
                <Pressable style = {styles.infosView} onPress={togglehistory}>
                    <Icon type = "material-community" name = "delete" size={25} color={'#fff'} style={{marginLeft : 8}} />
                    <Text style = {styles.text} numberOfLines={1} ellipsizeMode = 'tail' >
                        Remover da fila
                    </Text>
                </Pressable>
                
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    modalView: {
        backgroundColor : '#262626',
        margin: 20,
        width : '70%',
        height : 180,
        borderRadius: 8,
        shadowColor: '#000',
        alignItems : 'center',
        zIndex : 9,
        justifyContent : 'space-around',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    LineInfos : {
        flexDirection : 'row',
        width : '90%',
        alignItems : 'center',
        justifyContent : 'space-between',
        //backgroundColor : 'blue'
    },
    textTitulo : {
        width : '85%',
        fontSize : 16,
        fontWeight : '500',
        color : '#fff',
        marginLeft : 8,
        marginTop : 5
    },
    infosView : {
        width : '95%',
        height : 50,
        //backgroundColor : 'red',
        marginTop : 5,
        flexDirection : 'row',
        alignItems : 'center',
        //justifyContent : 'space-between'
    },
    text : {
        fontSize : 15,
        fontWeight : '500',
        color : '#fff',
        marginLeft : 20
    }
})

export default ModalAssistidos

