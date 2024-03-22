import React from "react"
import { Button,SafeAreaView, View } from "react-native"


export default props => {
    return(

        <View style={{flex : 1}}>
            <View>
                {props.avancar
                    ?  <Button 
                            title="Avancar" 
                            onPress={() => {
                                props.navigation.navigate(props.avancar)
                            }}
                        />
                    : false
                    
                }
            </View>
            <View style={{flex : 1}}>
                {props.children}
            </View>
        </View>

    )

}
