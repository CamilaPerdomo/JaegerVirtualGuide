/**
 * Componente para el ingreso del Username del usuario
 */

import React, { useState, useRef } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'

//Componentee que permite ingresar un texto plano
const UserNameInput = ({ GetValue, Title, Placeholder }) => {
    const [value, setValue] = useState(null)

    // Metodo que permite regresar a la vista Padre el valor ingresado por el usuario
    onChangeValue = (newValue) => {
        setValue(newValue)
        GetValue(newValue)
    }

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>
                {Title}
            </Text>
            <TextInput
                style={styles.inputStyle}
                value={value}
                onChangeText={onChangeValue}
                placeholder={Placeholder}
                placeholderTextColor="#999"
                keyboardType='default'
            />
        </View>
    )
}


// Variable que contiene los estilos de la vista
const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 10,
    },
    title: {
        color: '#777'
    },
    inputStyle: {
        width: 300,
        borderColor: '#333',
        borderRadius: 100,
        marginVertical: 5,
        paddingHorizontal: 15,
        color: '#333',
        backgroundColor: '#E6F7F7'
    }
})

export default UserNameInput