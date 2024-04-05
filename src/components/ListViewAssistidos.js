import React, { useState, useEffect, useCallback } from "react"
import { View, Text, FlatList, Pressable, StyleSheet, TouchableOpacity, Image, SafeAreaView } from "react-native"
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ModalAssistidos from "../components/ModalAssistidos";
import { Icon } from "@rneui/base"
import { useNavigation } from "@react-navigation/native";



const ListViewAssistidos = ({ hist }) => {
    const navigation = useNavigation()

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});


    const Item = ({ url, handle, img, titulo, des }) => {
    
        return (
            <Pressable style={styles.views} onPress={() => navigation.push('Player', {Link : url, Titulo : titulo, Info : des, Img : img})} >
                <LinearGradient style={styles.overlayer} colors={['rgba(5, 5, 5, 0.2)', 'rgba(5, 5, 5, 0.45)']} />
                <View style={styles.infos}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginLeft: 10,
                        marginRight: 5,
                        marginTop: 4
                    }}
                    >
                        <Text style={styles.textTitulo} numberOfLines={1} ellipsizeMode="tail" >
                            {titulo}
                        </Text>
                        <Icon type="material-community" name="dots-vertical" size={35} color={"#fff"} onPress={() => {
                            setModalVisible(true)
                            setSelectedItem({Nome : titulo})
                        }} />
                    </View>
                    <Text style={styles.textEpisode} numberOfLines={1} ellipsizeMode='tail' >
                        {des}
                    </Text>
                    <Pressable style={styles.buttonPlay} onPress={() => console.log(selectedItem)} >
                        <Icon type="material-community" name="play" size={35} color={'#fff'} />
                        <Text style={styles.play} >
                            CONTINUAR ASSISTINDO
                        </Text>
                    </Pressable>
                </View>
                <Image
                    style={styles.logo}
                    source={{
                        uri: img != '' ? img : 'https://cdn.ome.lt/q4bFjtoSWRK_ik5lA5q1GUpUcUU=/1200x630/smart/extras/conteudos/spy-x-family_b686TAs.jpg'
                    }}
                />
            </Pressable>
        )
    };


    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'flex-start', justifyContent : 'center', marginLeft : 8}}>
            <FlatList
                style={styles.list}
                data={hist}
                renderItem={({ item }) => <Item url = {item.Url} handle={() => setModalVisible(true)} img={item.Img} titulo={item.id} des={item.Descricao} />}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                maxToRenderPerBatch={4}
            />
            <ModalAssistidos handleVi={modalVisible} handleSet={() => setModalVisible(!modalVisible)} obj={selectedItem} />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    list: {
        marginLeft: 8,
        marginRight: 8
    },
    logo: {
        width: '100%',
        height: '100%',
        backgroundColor: '#808080',
        borderRadius: 5,
        //resizeMode : 'contain'
    },
    views: {
        height: 200,
        width: 350,
        backgroundColor: '#808080',
        marginTop: 10,
        marginRight: 10,
        borderRadius: 5,
    },
    overlayer : {
        height : 200,
        width : 350,
        position : 'absolute',
        zIndex : 90
    },
    infos : {
        height : 200,
        width : 350,
        position : 'absolute',
        zIndex : 98
    },
    textTitulo : {
        width : '90%',
        fontSize : 17,
        fontWeight : '500',
        color : '#fff',
    },
    textEpisode : {
        fontSize : 17,
        fontWeight : '500',
        color : '#fff',
        position : 'absolute',
        left : 10,
        top : 45
    },
    buttonPlay : {
        flexDirection : 'row',
        alignItems : 'center',
        height : 60,
        width : '80%',
        position : 'absolute',
        bottom : 0,
        left : 10
    },
    play : {
        color : '#fff',
        fontSize : 15,
        fontWeight : '600',
        marginLeft : 15
    },
    icon : {
        top : 25,
        right : 10,
        position : 'absolute',
    },
})

//<Icon type = "material-community" name = "play" size={35} color={'#fff'} />

export default ListViewAssistidos
