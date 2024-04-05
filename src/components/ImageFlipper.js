import React, { useContext } from "react"
import { View, Text, ImageBackground, Pressable, StyleSheet, Dimensions } from "react-native"
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from "@rneui/base"

import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../contexts/AuthCont";

//colors={['rgba(5, 5, 5, 0.3)', 'rgba(5, 5, 5, 8)']}


const ImageFlipper = ({ destaques }) => {

    const navigation = useNavigation()
    const { height, width } = Dimensions.get('window')
    const { test } = useContext(AuthContext)

    const block = 'https://baserow-media.ams3.digitaloceanspaces.com/user_files/JaVpjhgy6aDERTwkrTei646ZdHLw6Hfa_d0125fac2c679ac62213dd01c8a7ae53da02b1e91d395e03088850f013eeacec.png'
    

    function Separador (t){
        if(t == 'Filme'){
            return 'DetailsFilme'
        }
        else{
            return 'DetailsSerie'
        }
    }


    const handleInfo = () => {
        navigation.navigate(`${Separador(destaques.Tipo)}`, {Name : destaques.Nome, Url : destaques.Url, Tipo : destaques.Tipo, Categoria : destaques.Categoria})
    }


    return (
        <ImageBackground source={{uri: test == 'teste001@gmail.com' ? block : destaques.Url}} imageStyle = {{resizeMode : width > 450 ? 'contain' : 'cover'}} style = {styles.container}>
            <LinearGradient style = {styles.overlayer} colors={['rgba(5, 5, 5, 0.2)', 'rgba(5, 5, 5, 1)']} />
            <View style = {styles.viewInfos}>
                <Text style = {styles.textTitulo} numberOfLines={2}>
                    {destaques.Nome}
                </Text>
                <Text style = {styles.textSinopse} numberOfLines={5}>
                    {destaques.Sinopse}
                </Text>
                <Pressable style = {styles.buttonPlay} onPress={handleInfo}>
                    <Icon type = "material-community" name = "play" size={35} color={'#fff'} />
                    <Text style = {styles.play}>
                        ASSISTIR AGORA
                    </Text>
                </Pressable>
            </View>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    container : {
        marginTop : 70,
        height : 460,
        width : '100%',
        //flex : 1
    },
    overlayer : {
        height : 460,
        width : '100%',
        //backgroundColor : 'rgba(5.31, 5.31, 5.31, 0.26)',
        //boxShadow: '0px 0px 80px 5px rgba(0, 0, 0, 0.25)'
    },
    viewInfos : {
        position : 'absolute',
        zIndex : 99,
        bottom : 0,
        right : 5,
        left : 10,
        margin : 8
    },
    textTitulo : {
        fontSize : 24,
        fontWeight : '600',
        color : '#fff',
        marginBottom : 10
    },
    textSinopse : {
        fontSize : 16,
        fontWeight : '500',
        //marginLeft : 10,
        marginTop : 10,
        color : '#fff'
    },
    buttonPlay : {
        height : 50,
        width : 255,
        backgroundColor : '#50125D',
        marginTop : 15,
        borderRadius : 8,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-evenly',
    },
    play : {
        color : '#fff',
        fontSize : 16,
        fontWeight : '600'
    }
})

export default ImageFlipper

