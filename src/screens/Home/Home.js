import React, { useRef, useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Animated, SafeAreaView, ScrollView, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { buscar_usuario_Email, buscar_destaques, buscar_Lancamentos, buscar_populares, 
  buscar_filmes, buscar_serie, buscar_anime
} from '../../data/Apis';

import ListViewAssistidos from '../../components/ListViewAssistidos';
import HearderHome from '../../components/HeaderHome';
import ImageFlipper from '../../components/ImageFlipper';
import ListViews from '../../components/ListViews';

import { AuthContext } from '../../contexts/AuthCont'


const HomeScreen = ({ navigation }) => {

  const {test, setTotal, setDays, setConjuto, setSigned } = useContext(AuthContext)

  const [isLoading, setIsloading] = useState(true)
  const [destaques, setDestaques] = useState({})
  const [lan, setLan] = useState([])
  const [pop, setPop] = useState([])
  const [filmes, setFilmes] = useState([])
  const [series, setSeries] = useState([])
  const [animes, setAnimes] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [savedMovies, sethistotyMovies] = useState([]);

  
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    fetchDatas();

    setIsloading(true)

    setRefreshing(false)
  }, []);


  const sortearDestaque = async () => {
    try {
      const response = await buscar_destaques();
      const { success, data } = response;
  
      if (success && data.length > 0) {
        const indiceSorteado = Math.floor(Math.random() * data.length);
        const destaqueSorteado = data[indiceSorteado];
        setDestaques(destaqueSorteado)

      } else {
        console.log('Não foi possível obter os destaques.');
      }
    } catch (error) {
      console.error('Erro ao buscar os destaques:', error);
    }
  };


  ////////////////////////////////////////////////////////////////////////////////////////////

  const Calculo_dias = (data_obj) => {
    var numeroDias = `${data_obj.Dias}`
    var restante_dias = data_obj.Total
    const restante_int = parseInt(restante_dias); // total formatado para numero
    setTotal(restante_int)
    
    const regex = /^(\d+)\s(?:days|day)/;
    const match = numeroDias.match(regex);

    
    if (match && match[1]) {
      const Days = parseInt(match[1])

      const timeout = (restante_int - Days)

      setDays(timeout)

      if (timeout < 0) {
        setIsloading(false)
        setSigned(false)
        Alert.alert(
          'Assinatura Acabou...',
          'Renove a sua assinatura, clicando em ok.',
          [{text : 'ok', onPress : () => navigation.push('Payment')}]
        );
      }
      else{
        setSigned(true)
        setIsloading(false)
      }
    }
    else {
      setIsloading(false)
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////

  const fetchDatas = useCallback(async () => {
    loadhistotyMovies()
    try {
      // Segunda função: Buscar usuário pelo email do 'test'
      const userData = await buscar_usuario_Email(test);

      // Primeira função: Sortear destaque
      const destaqueSorteado = await sortearDestaque();

      const Lancamentos_api = await buscar_Lancamentos();
      const populares_api = await buscar_populares();
      const filmes_api = await buscar_filmes();
      const serie_api = await buscar_serie();
      const anime_api = await buscar_anime();

      // Extraindo o email do primeiro usuário retornado
      const userEmail = userData.data[0].Email;

      setLan(Lancamentos_api.data);
      setPop(populares_api.data);
      setFilmes(filmes_api.data);
      setSeries(serie_api.data);
      setAnimes(anime_api.data);

      // Configurar o conjunto de dados com o usuário retornado
      setConjuto(userData.data[0]);


      Calculo_dias(userData.data[0]);

    } catch (error) {
      Alert.alert(
        `Erro no Servidor: ${error}`,
        'Busque o suporte ou limpe o cache do app',
        [{ text: 'ok', onPress: () => navigation.replace('Auth') }] // redirecionar pra suporte
      );
    }
  }, []);


  // Load saved movies from AsyncStorage when the screen gains focus
  const loadhistotyMovies = async () => {
    try {
      const histotyMovies = await AsyncStorage.getItem("histotyMovies");
      const histotyMoviesArray = histotyMovies ? JSON.parse(histotyMovies) : [];
      sethistotyMovies(histotyMoviesArray);
      //console.log(histotyMoviesArray.length, histotyMoviesArray);

    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    fetchDatas();
  },[])


  const scrollOffsetY = useRef(new Animated.Value(0)).current;


  ////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <SafeAreaView style={styles.container} >
      {
        isLoading ? (
          <View style = {{flex : 1, alignItems : 'center', justifyContent : 'center', padding : 30, marginTop : 45}}>
            <ActivityIndicator size="large" color="purple" />
            <Text style = {{color : 'gray', fontSize : 14, fontWeight : '600'}}>
              Buscando Informações...
            </Text>
          </View>
        ) : (
          <>
            <HearderHome scrollOffsetY_1={scrollOffsetY} />
            <ScrollView 
              onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollOffsetY } } },],
                { useNativeDriver: false })}
              scrollEventThrottle={16}
              contentContainerStyle={{ paddingBottom: 10 }} refreshControl={
              <RefreshControl progressViewOffset={52} refreshing={refreshing} onRefresh={onRefresh} />}>

              <ImageFlipper destaques={destaques} />


              <View style={styles.BarTopic}>
                <Text style={styles.textTopic}>
                  Lançamentos
                </Text>
                <Text style={styles.textVer} onPress={() => navigation.navigate("Ver",{Item : 'Lancamentos'})} >
                  Ver Mais
                </Text>
              </View>

              <ListViews categoria={'Lancamentos'} set={lan} />

              {
                savedMovies.length == 0 ? (
                  <>
                  </>
                ) : (
                  <>
                    <View style={styles.BarTopic}>
                      <Text style={styles.textTopic}>
                        Continuar Assistindo
                      </Text>
                    </View>

                    <ListViewAssistidos hist={savedMovies} />
                  </>
                )
              }

              <View style={styles.BarTopic}>
                <Text style={styles.textTopic}>
                  Populares
                </Text>
                <Text style={styles.textVer} onPress={() => navigation.push("Ver",{Item : 'Populares'})}>
                  Ver Mais
                </Text>
              </View>

              <ListViews categoria={'Populares'} set={pop} />


              <View style={styles.BarTopic}>
                <Text style={styles.textTopic}>
                  Filmes
                </Text>
                <Text style={styles.textVer} onPress={() => navigation.navigate("Ver", {Item : 'Filmes'})}>
                  Ver Mais
                </Text>
              </View>

              <ListViews categoria={'Filmes'} set={filmes} />


              <View style={styles.BarTopic}>
                <Text style={styles.textTopic}>
                  Series
                </Text>
                <Text style={styles.textVer} onPress={() => navigation.navigate("Ver", {Item : 'Series'})}>
                  Ver Mais
                </Text>
              </View>

              <ListViews categoria={'Series'} set={series} />


              <View style={styles.BarTopic}>
                <Text style={styles.textTopic}>
                  Animes
                </Text>
                <Text style={styles.textVer} onPress={() => navigation.navigate("Ver", {Item : 'Animes'})}>
                  Ver Mais
                </Text>
              </View>

              <ListViews categoria={'Animes'} set={animes} />


            </ScrollView>
          </>
        )
      }
    </SafeAreaView>
  )
}

// lançamentos(x) - (continuar assistindo)() - populares(x) - filmes(x) - series(x) - animes(x)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#050505',
    flex: 1
  },
  textTopic : {
    color : '#fff',
    fontSize : 18,
    fontWeight : '600',
    marginLeft : 15,
  },
  textVer : {
    color : '#50125D',
    fontSize : 16,
    fontWeight : '700',
    marginRight : 15
  },
  BarTopic : {
    marginTop : 8,
    width : '100%',
    height : 55,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between'
  }
})


export default HomeScreen;

// ... other code from the previous section