import React, { useContext } from 'react';
import { StyleSheet, FlatList, Pressable, Image, Dimensions } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthCont';

const GridView = ({ doc }) => {

    const {height, width} = Dimensions.get('window');
    const { test } = useContext(AuthContext)
    const navigation = useNavigation()

    const block = 'https://baserow-media.ams3.digitaloceanspaces.com/user_files/JaVpjhgy6aDERTwkrTei646ZdHLw6Hfa_d0125fac2c679ac62213dd01c8a7ae53da02b1e91d395e03088850f013eeacec.png'

    function columns_number (){
        if (width >= 500){
            return 5
        }
        else{
            return 3
        }
    }

    function Separador (t){
        if(t == 'Filme'){
            return 'DetailsFilme'
        }
        else{
            return 'DetailsSerie'
        }
    }

    const RenderItem = ({ nome, url, tipo, cat }) => (
        <Pressable style={{ margin: 5 }} onPress={() => navigation.navigate(`${Separador(tipo)}`, {Name : nome, Url : url, Tipo : tipo, Categoria : cat})}>
          <Image
            style={{ width: 120, height: 185, borderRadius : 10, resizeMode : 'cover' }}
            source={{ uri: test == 'teste001@gmail.com' ? block : url }} // Supondo que você tenha a URL da imagem nos resultados da requisição
          />
        </Pressable>
    );


    return (
        <FlatList
            data={doc}
            renderItem={({ item }) => <RenderItem nome={item.Nome} url={item.Banner} cat={item.Categoria} tipo={item.Tipo} />}
            keyExtractor={item => item.Nome} // Supondo que cada item tenha uma propriedade 'id'
            numColumns={columns_number()} // Define o número de colunas no grid
            maxToRenderPerBatch={8}
            initialNumToRender={9}
            contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 5 }} // Espaçamento entre os itens
        />
    )

}


const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#050505'
    }
})

export default GridView;

// ... other code from the previous section