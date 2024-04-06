import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, SafeAreaView, BackHandler, Alert } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';


const PlayerScreen = ({ route }) => {
  
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [full, setFull] = useState({})
  const [movie, setMovie] = useState({});
  const navigation = useNavigation()
  const link = route.params.Link // link do video
  const h1 = route.params.Titulo // titulo 
  const eps = route.params.Info
  const imgAssis = route.params.Img


  const backAction = () => {
    Alert.alert('Espera!', 'Voçe quer mesmo voltar...?', [
      {
        text: 'Cancelar',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'Sim', onPress: () => {
        video.current.stopAsync()
        navigation.goBack()
      }},
    ]);
    return true;
  };


  const toggleFavouriteAndSave = async () => {
    video.current.playAsync()
    console.log(movie, "\n")

    try {
      // Check if Movie is already in Storage
      const histotyMovies = await AsyncStorage.getItem("histotyMovies");
      let histotyMoviesArray = histotyMovies ? JSON.parse(histotyMovies) : [];

      // Chcek if the movie is already in the saved list histotyMoviesArray
      const isMovieSavedIndex = histotyMoviesArray.findIndex(
        (savedMovie) => savedMovie.id === h1
      );

      if (isMovieSavedIndex === -1) {
        // If movie is not saved, add it to the saved list
        histotyMoviesArray.push(movie);
        await AsyncStorage.setItem(
          "histotyMovies",
          JSON.stringify(histotyMoviesArray)
        );
        
      } else {
        // If movie is already saved, remove it from the list

        histotyMoviesArray[isMovieSavedIndex].Url = link
        histotyMoviesArray[isMovieSavedIndex].Descricao = eps
        console.log(histotyMoviesArray)

        await AsyncStorage.setItem(
          "histotyMovies",
          JSON.stringify(histotyMoviesArray)
        );
      }
    } catch (error) {
      console.log("Error Saving Movie", error);
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////


  useEffect(() => {
    video.current.presentFullscreenPlayer()

    setMovie({"id" : h1, "Url" : link, "Descricao" : eps, "Img" : imgAssis})

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    //console.log(h1, eps)

    return () => backHandler.remove();
  }, []);


  return (
    <SafeAreaView style = {styles.container}>
      <>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: link,
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          onLoad={() => toggleFavouriteAndSave()}
          onFullscreenUpdate={(s) => setFull(s)}
          onPlaybackStatusUpdate={(st) => setStatus(st)}
        />
      </>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor: '#050505',
  },
  video: {
    width: '99%',
    height : '100%',
    alignItems : 'center',
    justifyContent : 'center'
  }
});


export default PlayerScreen
