import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import { buscar_Episodios, atualizar_Views } from "../data/Apis";


const Dropdown = ({ NomeTitulo, temporadas, id, vi, Assis }) => {

    const [eps, setEps] = useState([]) // todo documento
    const [selected, setSelected] = useState('') // item selecionado 
    const [loading, setLoading] = useState(true)
    const [temp, setTemp] = useState('1') // temporadas
    const [data, setData] = useState([])
    const navigation = useNavigation()


    const getEpi = async () => {

        if (selected.length > 3){
            const partes = selected.split(' ');

            // Acesse a segunda parte que contém o número da temporada
            const numero = partes[1];
            
            // Adicione um zero à esquerda se o número for menor que 10
            const numeroFormatado = numero < 10 ? `0${numero}` : numero;
            
            console.log(numeroFormatado,' aqui'); // Saída: 01

            const epiApi = await buscar_Episodios(NomeTitulo, numeroFormatado != ''? numeroFormatado : '1')

            if (epiApi.success){
                setEps(epiApi.data)

                console.log(selected,' b')
            }
            else{
                setEps([])
            }

        }
        else{
            const epiApi = await buscar_Episodios(NomeTitulo, temp)

            if (epiApi.success){
                setEps(epiApi.data)
            }
            else{
                setEps([])
            }
        }

        setLoading(false)

    }


    const view = async (u, t, e) => {

        const viewUpdate = await atualizar_Views(id, (parseInt(vi) + 1))

        navigation.navigate('Player', {Link : u, Titulo : NomeTitulo, Info : `T${t} : E${e}`, "Img" : Assis})

    }


    useEffect(() => {
        setLoading(!loading)
        getEpi()

    },[selected])


    useEffect(() => {
        console.log(temporadas, ' foi')

        const newData = [];
        for (let i = 1; i <= temporadas; i++) {
            newData.push({ key: i, value: `Temporada ${i}` });
        }
        setData(newData);
    },[temporadas])


    const EpiItem = ({ _te, _ep, _url }) => (
        <TouchableOpacity style = {styles.botaoEpi} activeOpacity={0.6} onPress={() => view(_url, _te, _ep)}>
            <Text style = {{color : '#fff', fontSize : 15, fontWeight : '500'}}>
                {`T${_te} : E${_ep}`}
            </Text>
        </TouchableOpacity>
    )


    return (
        <View style = {{width : '100%', marginTop : 40, justifyContent : 'center', alignItems : 'center'}}>

            {/* dropdown das Temporadas */}
            <View style = {{width : '90%', justifyContent : 'center', marginLeft : 12}}>
                <SelectList
                setSelected={(val) => setSelected(val)} 
                data={data} 
                save="value"
                search = {false}
                boxStyles={{borderColor : "#808080", borderWidth : 2}}
                dropdownStyles={{borderColor : "#808080", borderWidth : 2}}
                dropdownTextStyles={{color : "#fff"}}
                inputStyles={{color : '#fff'}}
                maxHeight={150}
                defaultOption={data[0]}
                />
            </View>


            {/* Lista das Temporadas */}
            <View style = {{width : '95%', justifyContent : 'flex-start', alignItems : 'center', marginTop : 25, height : 'auto'}}>
                {loading ? (
                    <ActivityIndicator size={'large'} color={"#50125D"} />
                ) : eps.map((item) => <EpiItem key={item.id.toString()} _te={item.Temporada} _ep={item.Episodio} _url={item.Url} />)}
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    botaoEpi : {
        height : 55,
        width : '80%',
        backgroundColor : 'black',
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 8,
        borderColor : "#50125D",
        borderWidth : 2,
        marginBottom : 10
    }
})


export default Dropdown
