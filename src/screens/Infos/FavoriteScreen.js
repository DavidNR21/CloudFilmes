import React, { useEffect, useState, useContext, useCallback } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Pressable, Image, FlatList, ActivityIndicator, RefreshControl} from 'react-native';
import { Icon } from '@rneui/base';
import Toast from 'react-native-toast-message';

import { buscar_Favs, Config } from '../../data/Apis';
import { AuthContext } from '../../contexts/AuthCont'



const FavoriteScreen = ({ navigation }) => {

  const { test } = useContext(AuthContext)

  function Separador (t){
    if(t == 'Filme'){
        return 'DetailsFilme'
    }
    else{
        return 'DetailsSerie'
    }
  }


  const handleDelete = (_id, _nome) => {
    try {
      fetch(`https://api.baserow.io/api/database/rows/table/256138/${_id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${Config.token}`
        }
      });
  
      Toast.show({
        type: 'success',
        text1: 'Favoritos',
        text2: `${_nome} Foi deletado com sucesso.`
      });

      setNfavs((nfavs) => nfavs -1)
      const updatedData = favs.filter(item => item.id !== _id);
      console.log(updatedData)
      setFavs(updatedData);

    } catch (error) {
      console.error('Erro ao excluir o favorito:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Ocorreu um erro ao excluir o favorito.'
      });
    }
  };

  //https://starflix.usermaster893.workers.dev/download.aspx?file=xV4%2BjwHbcUB3wMR8AIZINc1aamT7Wli6jtFDtArGmFI%2F29Zhah8rdcX7v6JGbHwC&expiry=IDRoK1IAhaVRHfyiCJO8Fg%3D%3D&mac=8f28908bc3a614464b66fdac79909626a8e8a3cf7fdd7bbb6bb90805f5a5f444


  const Item = ({ nome, id, url ,tipo, cat }) => (
    <View style = {styles.viewList}>
      <Pressable style={styles.favs} onPress={() => navigation.navigate(`${Separador(tipo)}`, {Name : nome, Url : url, Tipo : tipo, Categoria : cat})}>
        <Image
          source={{ uri: url }}
          style={styles.logo}
        />
        <View style={styles.infos}>

          <View style={{ width: '100%' }}>
            <Text style={styles.tituloInfos} ellipsizeMode='tail' numberOfLines={1}>
              {nome}
            </Text>
          </View>

          <Text style={styles.subInfos}>
            {tipo}
          </Text>

        </View>

        <Pressable style={styles.iconInfos}>
          <Icon type="material-community" name='delete' size={30} color={'red'} onPress={() => handleDelete(id, nome)} />
        </Pressable>

      </Pressable>
    </View>
  )


  const [favs, setFavs] = useState([])
  const [loading, setLoading] = useState(true)
  const [nfavs, setNfavs] = useState(0)
  const [refreshing, setRefreshing] = useState(false)


  const onRefresh = useCallback(() => {
    setRefreshing(true);

    fecthFavs()

    setRefreshing(false)
  }, []);


  const fecthFavs = useCallback(async () => {
    try {
      const query_favs = await buscar_Favs(test);

      setFavs(query_favs.data);
      setNfavs(query_favs.count);
      setLoading(false);

    } catch (error) {
      console.error('Erro ao buscar os favoritos:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Ocorreu um erro ao buscar os favoritos.'
      });
      setLoading(false);
    }
  }, []);


  useEffect(() => {

    fecthFavs();
  },[])


  return (
    <SafeAreaView style = {styles.container}>
      {
      loading ? (
        <View style = {{width : '100%', height : '100%', justifyContent : 'center', alignItems : 'center'}}>
          <ActivityIndicator size={"large"} color={"purple"} />
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.text}>
              Meus Favoritos
              </Text>
            </View>

            <View style={{ width: '100%', height: 50, marginTop: 5, justifyContent: 'center', marginBottom: 5 }}>
              <Text style={{ color: 'gray', fontSize: 15, fontWeight: '500', marginLeft: 10 }}>
                {`${nfavs}/30 Itens`}
              </Text>
            </View>

            <FlatList
              data={favs}
              renderItem={({ item }) => <Item nome={item.Nome} id = {item.id} url = {item.Url} tipo = {item.Tipo} cat={item.Categoria} />}
              keyExtractor={item => item.Nome} // Supondo que cada item tenha uma propriedade 'id'
              maxToRenderPerBatch={8}
              initialNumToRender={8}
              refreshControl={<RefreshControl progressViewOffset={52} refreshing={refreshing} onRefresh={onRefresh} />}
            />

        </>
      )}

    </SafeAreaView>
  );
}

//<Icon type = "material-community" name = 'eye' size={35} />

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : '#050505'
  },
  header : {
    width : '100%',
    height : 70,
    backgroundColor : '#050505',
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center',
    borderBottomColor : '#1E1E1E',
    borderWidth : 4
  },
  text : {
    fontSize : 24,
    fontWeight : '600',
    color : '#50125D'
  },
  viewList : {
    width : '100%',
    alignItems : 'center',
    justifyContent : 'center',
    marginBottom : 12
  },
  favs : {
    width : '90%',
    height : 145,
    backgroundColor : '#050505',
    flexDirection : 'row',
    borderColor : 'gray',
    borderWidth : 1,
    borderRadius : 8
  },
  logo: {
    width: 130,
    height: '100%',
    borderRadius: 8,
    resizeMode : 'contain'
  },
  infos : {
    flex : 2,
    flexDirection : 'column',
    //backgroundColor : 'red',
    alignItems : 'flex-start',
    justifyContent : 'space-around',
  },
  tituloInfos : {
    fontSize : 16,
    fontWeight : '600',
    color : '#fff',
    width : '100%'
  },
  subInfos : {
    fontSize : 15,
    fontWeight : '500',
    color : 'gray'
  },
  iconInfos : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center',
  }
})


export default FavoriteScreen;

// ... other code from the previous section