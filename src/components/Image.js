import React, { useState } from "react"
import { Image, StyleSheet, Pressable, Button, Text } from "react-native"
import { useNavigation } from "@react-navigation/native";


const DisplayAnImage = ({ id_name, url_image }) => {
  const navigation = useNavigation()

  return (
    <Pressable style={styles.views} onPress={() => navigation.navigate("Details", {name : id_name})}>
      <Image
        style={styles.logo}
        source={{
          uri: url_image
        }}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: 'black',
    width: '100%',
    height: '100%'
  },
  logo: {
    width: 130,
    height: 185,
    backgroundColor: 'red',
    borderRadius: 5,
    //resizeMode : 'contain'
  },
  views: {
    height: 185,
    width: 130,
    backgroundColor: 'blue',
    marginTop: 10,
    marginRight: 10,
    borderRadius: 5
  }
})

export default DisplayAnImage;


