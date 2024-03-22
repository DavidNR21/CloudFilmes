import React, { useState, useEffect, useContext } from "react"
import { FlatList, Pressable, StyleSheet, Image } from "react-native"
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../contexts/AuthCont";

const ListViews = ({ categoria, set }) => {

    const navigation = useNavigation()
    const [document, setDocument] = useState([])
    const block = 'https://baserow-media.ams3.digitaloceanspaces.com/user_files/JaVpjhgy6aDERTwkrTei646ZdHLw6Hfa_d0125fac2c679ac62213dd01c8a7ae53da02b1e91d395e03088850f013eeacec.png'

    const { test } = useContext(AuthContext)


    useEffect(() => {
        const fetchItems = async () => {
            try {
                setDocument(set);
            } catch (error) {
                console.error('Erro ao buscar itens:', error);
            }
        };
        fetchItems()
    }, [categoria])


    const Item = ({ id, url, tipo, cat }) => (
        <Pressable
            style={styles.views}
            onPress={() => navigation.navigate(`${Separador(tipo)}`, { Name: id, Url: url, Tipo: tipo, Categoria: cat })}
        >
            <Image
                style={styles.logo}
                source={{ uri: test == 'teste001@gmail.com' ? block : url}}
            />
        </Pressable>
    );

    const Separador = (t) => {
        if (t === 'Filme') {
            return 'DetailsFilme'
        } else {
            return 'DetailsSerie'
        }
    };

    return (
        <FlatList
            style={styles.list}
            data={document}
            renderItem={({ item }) => <Item url={item.Banner} id={item.Nome} tipo={item.Tipo} cat={item.Categoria} />}
            keyExtractor={item => item.Nome}
            horizontal
            showsHorizontalScrollIndicator={false}
            initialNumToRender={8}
        />
    )
}

const styles = StyleSheet.create({
    list: {
        marginLeft: 8,
        marginRight: 8
    },
    logo: {
        width: 130,
        height: 185,
        backgroundColor: '#262626',
        borderRadius: 5,
    },
    views: {
        height: 185,
        width: 130,
        backgroundColor: '#262626',
        marginTop: 10,
        marginRight: 10,
        borderRadius: 5, // Elevação padrão
    }
})

export default ListViews
