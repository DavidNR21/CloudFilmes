import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, 
    View, 
    Text, 
    SafeAreaView, 
    ScrollView, 
    TouchableOpacity, 
    Dimensions,
    Image, 
    ActivityIndicator, 
    Pressable} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import ListViews from '../../components/ListViews';
import Toast from 'react-native-toast-message';
import Dropdown from '../../components/TempDrop';

import { Icon } from '@rneui/base';
import { relacionados_Api, buscar_Favs, buscar_Infos, Criar_Favs } from '../../data/Apis';
import { AuthContext } from '../../contexts/AuthCont';


const SeriesScreen = ({ navigation, route }) => {

    const { test } = useContext(AuthContext)

    const UrlImage = route.params.Url
    const Tipo = route.params.Tipo
    const Title = route.params.Name
    const Categoria = route.params.Categoria
    const block = 'https://baserow-media.ams3.digitaloceanspaces.com/user_files/JaVpjhgy6aDERTwkrTei646ZdHLw6Hfa_d0125fac2c679ac62213dd01c8a7ae53da02b1e91d395e03088850f013eeacec.png'

    const {height, width} = Dimensions.get('window')
    const [loading, setLoading] = useState(false)
    const [loadingCat, setLoadingCat] = useState(true)
    const [doc, setDoc] = useState([])

    const [Duracao, setDuracao] = useState('')
    const [Sinopse, setSinopse] = useState('')
    const [Temporadas, setTemporadas] = useState(1)
    const [visualizacoes, setVisualizacoes] = useState(1)
    const [idTitulo, setIdtitulo] = useState(0)
    const [imgAssistindo, setAssistindo] = useState('')


    function columns_number (){
        if (width >= 460){
            return 520
        }
        else{
            return 320
        }
    }


    const Favs = async () => {
        const searchFavs = await buscar_Favs(test)

        const filmeItens = []

        if (searchFavs.success){
            searchFavs.data.forEach(filme => {
                filmeItens.push(filme.Nome)
            });

            if(filmeItens.includes(Title)){

                Toast.show({
                    type: 'info',
                    text1: 'Favoritos',
                    text2: `${Title} já foi adicionado.`
                });
            }
            else{
                const favsApi = await Criar_Favs(Title, test, UrlImage, Tipo, Categoria)

                if (favsApi.success){
                    Toast.show({
                        type: 'success',
                        text1: 'Favoritos',
                        text2: `${Title} adicionado com sucesso.`
                    });
                }
            }
        }
    }


    const relacionados = async () => {
        const relacionadosApi = await relacionados_Api(Categoria)

        setDoc(relacionadosApi.data)

        setLoadingCat(false)
        setLoading(false)
    }


    const getInfos = async () => {
        const infoApi = await buscar_Infos(Title)

        setSinopse(infoApi.data[0]['Sinopse'])
        setDuracao(infoApi.data[0]['Duracao'])
        setTemporadas(infoApi.data[0]['Temporadas'])
        setVisualizacoes(infoApi.data[0]['Visualizacoes'])
        setIdtitulo(infoApi.data[0]['id'])
        setAssistindo(infoApi.data[0]['Assistindo_imagem'])

    }


    useEffect(() => {
        setLoading(!loading)
        columns_number
        getInfos()
        relacionados()
    },[Title])


    return (
        <SafeAreaView style = {styles.container}>
            {loading ? (
                <View style = {{width : width, height : height, alignItems : 'center', justifyContent : 'center'}}>
                    <ActivityIndicator size={'large'} color={"purple"} />
                </View>
            ) : (
                <>
                    <ScrollView contentContainerStyle = {{paddingBottom: 25}}>
                        <View style={{ width: width }}>
                            <View style={styles.header}>
                                <TouchableOpacity style={styles.icons} activeOpacity={0.6} onPress={() => navigation.goBack()}>
                                    <Icon name='arrow-back' size={35} color={'#fff'} />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.icons} activeOpacity={0.6} onPress={Favs}>
                                    <Icon type='material-community' name='heart-outline' size={30} color={'#fff'} />
                                </TouchableOpacity>

                            </View>

                            <View>
                                <LinearGradient style={[styles.overlayer, { height: height * 0.64 }]} colors={['rgba(5, 5, 5, 0.2)', 'rgba(5, 5, 5, 1)']} />
                                <Image
                                    source={{
                                        uri: test == 'teste001@gmail.com' ? block : UrlImage
                                    }}
                                    style={{
                                        width: width,
                                        height: height * 0.64,
                                    }}
                                />
                            </View>

                            <View style = {styles.viewTitle}>
                                <View style = {styles.viewInfos}>
                                    <Text style = {styles.title} numberOfLines={1} ellipsizeMode='tail'>
                                        {Title}
                                    </Text>

                                    <View style = {{flexDirection : 'row'}}>
                                        <Icon type = "material-community" name = 'eye' size={25} color={'#fff'} />

                                        <Text style = {{fontSize : 16, marginRight : 12, marginLeft : 10, color : '#fff'}}>
                                            {visualizacoes}
                                        </Text>
                                    </View>

                                </View>

                                <View style= {styles.viewTipo}>
                                    <Text style = {{fontSize : 18, marginRight : 12, marginLeft : 10, color : '#808080'}}>
                                        {Tipo}
                                    </Text>
                                </View>

                                <View style = {{width : '98%', alignItems : 'center', justifyContent : 'center', marginTop : 10, flexDirection : 'row'}}>
                                    <TouchableOpacity style = {styles.buttonCategoria} activeOpacity={0.6}>
                                        <Text style = {{color : '#fff'}}>
                                            {Categoria}
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style = {styles.buttonCategoria} activeOpacity={0.6}>
                                        <Text style = {{color : '#fff'}}>
                                        {`Episodios: ${Duracao}`}
                                        </Text>
                                    </TouchableOpacity>

                                </View>

                            </View>

                        </View>

                        <View style = {styles.viewSinopse}>
                            <Text style = {{color : '#fff', fontSize : 18, marginLeft : 12}}>
                                Sinopse : 
                            </Text>

                            <View style = {styles.sinopse}>
                                <Text style = {styles.sinopseText} numberOfLines={5} ellipsizeMode='tail'>
                                    {Sinopse}
                                </Text>
                            </View>

                        </View>

                        {/* dropdown de temporadas */}
                        <Dropdown NomeTitulo={Title} temporadas={Temporadas} id={idTitulo} vi={visualizacoes} Assis={imgAssistindo} />



                        {/* relacionados */}
                        <View style = {{width : width}}>
                            <View style = {{width : width, marginTop : 30}}>
                                <Text style = {{fontSize : 17, marginLeft : 12, color : '#fff'}}>
                                    Relacionados: 
                                </Text>
                            </View>

                            {loadingCat ? (
                                <View style = {{width : width, height : 200, alignItems : 'center', justifyContent : 'center'}}>
                                    <ActivityIndicator size={'large'} color={"purple"} />
                                </View>
                            ) : (
                                <>
                                    <View style = {{width : width, marginTop : 5}}>
                                        <ListViews set={doc} />
                                    </View>
                                </>
                            )}
                            
                        </View>


                    </ScrollView>
                </>
            )}
        </SafeAreaView>
    )
}


//#121212  type="material-community" 

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#050505'
    },
    overlayer : {
        width : '100%',
        position : 'absolute',
        top : 0,
        zIndex : 19
    },
    header : {
        zIndex : 20,
        width: '100%',
        flexDirection : 'row',
        justifyContent : 'space-between',
        position : 'absolute',
        marginTop : 5
    },
    icons : {
        width : 40,
        height : 40,
        borderRadius : 24,
        backgroundColor : '#121212',
        alignItems : 'center',
        justifyContent : 'center',
        marginLeft : 12,
        marginRight : 12,
        marginTop : 5
    },
    viewTitle : {
        position : 'absolute',
        bottom : 0,
        width : '100%',
        zIndex : 23,
        //backgroundColor : 'blue',
        height : 150,
        flexDirection : 'column'
    },
    title : {
        color : '#fff',
        fontSize : 21,
        marginLeft : 10,
        fontWeight : '600',
        width : '65%'
    },
    viewInfos : {
        flexDirection : 'row', 
        justifyContent : 'space-between', 
        alignItems : 'center',
        //backgroundColor : 'red',
        width : '100%'
    },
    viewTipo : {
        width : '100%',
        height : 40,
        //backgroundColor : 'gray',
        justifyContent : 'center'
    },
    buttonCategoria : {
        margin : 5,
        height : 45,
        paddingLeft : 30,
        paddingRight : 30,
        backgroundColor : 'black',
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 8,
        borderColor : "#50125D",
        borderWidth : 2
    },
    viewSinopse : {
        width : '99%',
        marginTop : 8
    },
    sinopse : {
        marginTop : 6,
        width : '95%',
        flexDirection : 'column'
    },
    sinopseText : {
        fontSize : 15,
        color : '#fff',
        textAlign : 'justify',
        marginLeft : 12
    },
    assistir : {
        height : 55,
        backgroundColor : '#50125D',
        borderRadius : 8,
        alignItems : 'center',
        justifyContent : 'center',
        flexDirection : 'row'
    }
})

// z-index: 20;


export default SeriesScreen

