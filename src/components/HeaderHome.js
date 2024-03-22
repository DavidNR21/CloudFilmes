import React, { useRef } from 'react'
import { Text, Animated } from "react-native";
import { Icon } from '@rneui/base';

import { useNavigation } from '@react-navigation/native';


const HearderHome = ({ scrollOffsetY_1 }) => {

  const navigation = useNavigation()

  const h_max_height = 72;
  const h_min_height = 70;
  const h_scrool_distance = h_max_height - h_min_height;

  const headerScrollHeight = scrollOffsetY_1.interpolate({
    inputRange: [0, h_scrool_distance],
    outputRange: [h_max_height, h_min_height],
    extrapolate: 'clamp'
  })


  return (
    <Animated.View
      style={{
        position: 'absolute',
        //top: 52,
        left: 0,
        right: 0,
        zIndex: 60,
        width: '100%',
        height: headerScrollHeight,
        padding: 10,
        backgroundColor: "#121212",
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
        opacity: scrollOffsetY_1.interpolate({
          inputRange: [0, 60, 350, 550],
          outputRange: [1, 0, 0, 1],
          extrapolate: 'clamp'
        })
      }}
    >
      <Text style={{ color: '#50125D', fontSize: 26, fontWeight: '700', marginLeft : 7}}>
        CloudFilmes
      </Text>
      <Icon name = 'search' size = {30} color = {'#fff'} style={{marginRight : 10}} onPress={() => navigation.navigate('Search')} />
    </Animated.View>
  )
}

export default HearderHome;

// ... other code from the previous section