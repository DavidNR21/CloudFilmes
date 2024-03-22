import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet, Text, Pressable, ActivityIndicator, Dimensions } from "react-native";

import GridView from "../../components/GridView";
import { buscar_api } from "../../data/Apis";


const SugestaoScreen = ({ route }) => {

    const {height, width} = Dimensions.get('window')
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const item = route.params.Item


    const getData = async (n) => {
        try {
            const SugesApi = await buscar_api(n)

            setData(SugesApi.data)

            setTimeout(() => {
                setLoading(false)
            }, 3000);
            
        } catch (error) {
            console.error('Erro ao buscar itens:', error);
        }
    }

    useEffect(() => {
        getData(item)
    },[])

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


export default SugestaoScreen
