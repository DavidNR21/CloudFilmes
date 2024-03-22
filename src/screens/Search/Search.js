import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';


import { buscar_api } from '../../data/Apis';
import { Icon } from '@rneui/base';
import Input from '../../components/Inputs'
import GridView from '../../components/GridView';


const SeacrhScreen = ({ navigation }) => {

    const [nomeSearch, setSearch] = useState('')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)



    const handleSearch = async (query) => {
        setSearch(query)

        if (query && query.length > 2) {
            setLoading(false)
            const searchAPI = await buscar_api(query)
            setData(searchAPI.data)
            
        }
        else {
            
            setLoading(true)
        }
    };


    return (
        <SafeAreaView style = {styles.container}>
            <View style = {styles.search}>
            <Icon name = 'arrow-back' size = {35} color = {'#fff'} style={{marginLeft : 5}} onPress={() => navigation.goBack()} />
                <Input
                    placeholder = 'Digite aqui...'
                    placeholderTextColor={"#808080"}
                    textAlign = 'left'
                    textAlignVertical = 'center'
                    color = '#fff'
                    value = {nomeSearch}
                    onChangeText = {(val) => handleSearch(val)}
                />
            </View>

            <View style = {{width : '100%', height : 45, alignItems : 'flex-start', marginTop : 10}}>
                <Text style = {{fontSize : 15, fontWeight : '400', color : '#fff', marginLeft : 10}}>
                    Resultados da pesquisa:
                </Text>
            </View>

            {!loading > 0 ? (
                <>
                    <View style = {styles.grid}>
                        <GridView doc={data} />
                    </View>
                </>
            ) : (
                <>
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
    search : {
        width : '100%',
        height : 85,
        backgroundColor : '#050505',
        flexDirection : 'row',
        alignItems : 'center'
    },
    grid : {
        width : '100%',
        marginBottom : 8,
        height : '80%',
        justifyContent : 'center',
        alignItems : 'center'  
    }
})


export default SeacrhScreen

