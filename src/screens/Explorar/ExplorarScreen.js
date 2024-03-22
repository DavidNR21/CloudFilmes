import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Pressable, ActivityIndicator, Dimensions } from 'react-native';
import { buscar_Titulos_explorar } from "../../data/Apis";

import ListContainers from "../../components/ListContainers";
import GridView from "../../components/GridView";


const DOCUMENT = [
  {
    nome : 'Missão Impossível',
  },
  {
    nome : 'Transformers',
  },
  {
    nome : 'Toy Story',
  },
  {
    nome : 'Vingadores',
  },
  {
    nome : 'Matrix',
  },
  {
    nome : 'Homem-Aranha'
  },
  {
    nome : 'Panico'
  },
  {
    nome : 'Jogos Vorazes'
  }
]


const ExplorarScreen = ({ navigation }) => {

  const Item = ({ nome }) => (
    <Pressable style = {styles.containers} onPress={() => navigation.navigate('Sugestao', {Item : nome})} >
        <Text style = {styles.text_sus}>
            {nome}
        </Text>
    </Pressable>
  )

  const [lancamentos, setLancamentos] = useState([])
  const [load, setLoad] = useState(true)
  const {height, width} = Dimensions.get('window');


  useEffect(() => {
    const carregarLancamentos = async () => {
      try {
        const response = await buscar_Titulos_explorar();
        if (response.success) {
          setLancamentos(response.data);
          //setLoad(false)
        } else {
          console.error('Erro ao carregar os lançamentos');
        }
        setLoad(false)
      } catch (error) {
        console.error('Erro ao carregar os lançamentos:', error);
      }
    };
    carregarLancamentos();
  }, [])


  return (
    <SafeAreaView style = {styles.container}>
        <View style = {styles.header}>
            <Text style = {styles.logo}>
                Explorar
            </Text>
        </View>

        <View style = {styles.block}>
          <Text style = {styles.text}>
            Generos
          </Text>
        </View>

        {load ? (
          <View style = {{width : '100%', height : 60, marginTop : 5, marginBottom : 5}}>
            <ActivityIndicator size="large" color="purple" />
          </View>
        ) : (
          <View style = {{width : '100%', height : 70, marginTop : 5, marginBottom : 5}}>
            <ListContainers />
          </View>
        )}

        <View style = {styles.block}>
          <Text style = {styles.text}>
            Sugestões
          </Text>
        </View>

        <View style = {{width : '100%', height : 70, marginTop : 5, marginBottom : 10}}>
          <FlatList
            data={DOCUMENT}
            renderItem={({ item }) => <Item nome={item.nome} />}
            keyExtractor={item => item.nome}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {load ? (
          <View style = {{flex : 1, alignItems : 'center', justifyContent : 'center', padding : 30, marginTop : 45}}>
            <ActivityIndicator size="large" color="purple" />
          </View>
        ) : (
          <View style = {{width : parseInt(width), alignItems : 'center', justifyContent : 'center', maxHeight : '57%'}}>
            <GridView doc={lancamentos} />
          </View>
        )}

    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container : {
      flex : 1,
      backgroundColor : '#050505'
  },
  header : {
    width : '100%',
    height : 75,
    backgroundColor : '#050505',
    alignItems : 'flex-start',
    justifyContent : 'center'
  },
  logo : {
    color : "#50125D",
    fontSize : 25,
    fontWeight : '600',
    marginLeft : 10
  },
  block : {
    marginTop : 8,
    width: '100%',
    height : 30,
    backgroundColor : '#050505',
    flexDirection : 'column'
  },
  text : {
    color : '#fff',
    fontSize : 17,
    fontWeight : '500',
    marginLeft : 10
  },
  containers : {
    backgroundColor : '#fff',
    justifyContent : 'center',
    alignItems : 'center',
    width : 160,
    borderRadius : 10,
    margin : 8
  },
  text_sus : {
    color : 'black',
    fontWeight : '500',
    width : '100%',
    textAlign : 'center'
  }
})

export default ExplorarScreen;

// ... other code from the previous section