import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Icon } from '@rneui/base';


const Input = ({iconName, password, onFocus = () => {}, ...props}) => {
    const [hidePassword, setHidePassword] = useState(password)

    return (
        <View style = {styles.boxInput}>
            <TextInput style = {styles.input}
                secureTextEntry={hidePassword}
                {...props}
            />
            {password && (
                <Icon 
                    onPress = {() => setHidePassword(!hidePassword)}
                    name = {hidePassword ? 'eye' : 'eye-off'}
                    type = "material-community"
                    color={'#fff'}
                    style = {{
                        color: '#fff', 
                        fontSize: 25, 
                        flex : 1, 
                        justifyContent : 'center',
                    }}
                />
            )}
        </View>
    )

}



const styles = StyleSheet.create({
    boxInput : {
        height: 60,
        backgroundColor: '#141519',
        flexDirection: 'row',
        borderBottomColor : '#50125D',
        borderWidth : 2,
        borderRadius : 8,
        margin : 15,
    },
    input : {
        width : '90%',
        fontSize : 16,
        paddingLeft : 10,
        fontWeight : '600',
    }
})


export default Input
