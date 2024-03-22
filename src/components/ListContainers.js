import React, {useState, useEffect} from 'react';
import { Pressable, Text, StyleSheet, FlatList } from 'react-native';
import { buscar_categorias } from '../data/Apis';

import { useNavigation } from '@react-navigation/native';


const ListContainers = () => {

    const navigation = useNavigation()

    const [categorias, setCategorias] = useState([])

    const Item = ({ nome }) => (
        <Pressable style = {styles.containers} onPress={() => navigation.navigate('Ver',{Item : nome})}>
            <Text style = {styles.text}>
                {nome}
            </Text>
        </Pressable>
    )


    const handle_cats = async () => {
        const categorias_api = await buscar_categorias()
        setCategorias(categorias_api.data)
    }

    useEffect(() => {

        handle_cats()

    },[])


    return(
        <FlatList 
        data = {categorias}
        renderItem = {({item}) => <Item nome = {item.Nome} />}
        keyExtractor={item => item.Nome}
        horizontal
        showsHorizontalScrollIndicator = {false}
        />
    )
}



const styles = StyleSheet.create({
  containers : {
    backgroundColor : '#fff',
    justifyContent : 'center',
    alignItems : 'center',
    width : 165,
    borderRadius : 10,
    margin : 8
  },
  text : {
    color : 'black',
    fontWeight : '500'
  }
})

export default ListContainers;

// ... other code from the previous section