import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet, Text, Pressable, ActivityIndicator, Dimensions } from "react-native";

import GridView from "../../components/GridView";
import { Config } from "../../data/Apis";


const VerMais = ({ navigation, route }) => {

    const {height, width} = Dimensions.get('window')

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [url, setUrl] = useState('')

    const item = route.params.Item


    const Paginacao = async (u) => {
        try {
          const response = await fetch(u, {
            method: 'GET',
            headers: {
              'Authorization': `Token ${Config.token}`
            }
            })
          const json = await response.json();
          const status = response.status;
      
          return {success: true, data: json.results, status: status, count : json.count};
      
        } catch (error) {
          console.log(error);
          return {success: false, data: error};
        }
    };


    const getData = async () => {
        try {
            if (item === 'Lancamentos') {
                let l = `${Config.baseURL}/rows/table/248859/?user_field_names=true&filter__field_1755894__boolean=true&order_by=-Lancamento&size=30&page=${page}`
                const l_Api = await Paginacao(l)
                setData(l_Api.data)
            }
            else if (item === 'Populares') {
                let p = `${Config.baseURL}/rows/table/248859/?user_field_names=true&filter__field_1755894__boolean=true&order_by=-Visualizacoes&size=30&page=${page}`
                const p_Api = await Paginacao(p)
                setData(p_Api.data)
            }
            else if (item === 'Filmes') {
                let f = `${Config.baseURL}/rows/table/248859/?user_field_names=true&filter__field_1755894__boolean=true&filter__field_1756070__contains=Filme&order_by=-Lancamento&size=30&page=${page}`
                const f_Api = await Paginacao(f)
                setData(f_Api.data)
            }
            else if (item === 'Series') {
                let s = `${Config.baseURL}/rows/table/248859/?user_field_names=true&filter__field_1755894__boolean=true&filter__field_1756070__contains=Serie&order_by=-Lancamento&size=30&page=${page}`
                const s_Api = await Paginacao(s)
                setData(s_Api.data)
            }
            else if (item === 'Animes') {
                let a = `${Config.baseURL}/rows/table/248859/?user_field_names=true&filter__field_1755894__boolean=true&filter__field_1756070__contains=Anime&order_by=-Lancamento&size=30&page=${page}`
                const a_Api = await Paginacao(a)
                setData(a_Api.data)
            }
            else{
                let c = `${Config.baseURL}/rows/table/248859/?user_field_names=true&filter__field_1755894__boolean=true&filter__field_1755926__contains=${item}&order_by=-Lancamento&size=30&page=${page}`
                const c_Api = await Paginacao(c)
                setData(c_Api.data)
            }

            setTimeout(() => {
                setLoading(false)
            }, 3000);
            
        } catch (error) {
            console.error('Erro ao buscar itens:', error);
        }
    }


    useEffect(() => {
        getData()
    }, [page])


    return(
        <SafeAreaView style = {styles.container}>

            {loading ? (
                <View style = {{width : '100%', height : '100%', alignItems : 'center', justifyContent : 'center'}}>
                    <ActivityIndicator size={'large'} color={'purple'} />
                </View>
            ) : (
                <>
                    <View style={{ width: '100%', borderBottomColor: '#50125D', borderWidth: 2 }}>
                        <View style={styles.header}>
                            <Text style={{ color: '#fff', fontSize: 22 }}>
                                {item}
                            </Text>

                        </View>
                    </View>

                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 20, height : parseInt(height) - 180 }}>
                        <GridView doc={data} />
                    </View>

                    <View style={{ width: '100%', alignItems: 'flex-end' }}>
                        <Pressable style={styles.icons} onPress={() => {setPage((prev) => prev + 1)}}>
                            <Text style={{ color: '#fff', fontSize: 18 }}>
                                Proximo
                            </Text>
                        </Pressable>
                    </View>
                </>
            )}

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#050505'
    },
    header : {
        height : 65,
        alignItems : 'center',
        width : '100%',
        flexDirection : 'row',
        justifyContent : 'center'
    },
    icons : {
        marginRight : 15,
        marginTop  : 10,
        height : 45,
        paddingLeft : 35,
        paddingRight : 35,
        width : 320,
        backgroundColor : 'black',
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 8,
        borderColor : "#50125D",
        borderWidth : 2
    }
})


export default VerMais
