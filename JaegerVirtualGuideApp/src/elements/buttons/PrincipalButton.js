/**
 * Boton con el estilo principal de la aplicación
 */

import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

// Componente para ser usado como boton principal de la aplicación
const PrincipalButton = ({ onClickAction }) => {
    return (
        <TouchableOpacity
            style={styles.PrincipalButton}
            onPress={onClickAction}>
            <Text style={styles.TextButton}>Continuar</Text>
        </TouchableOpacity>
    )
}

// Variable que contiene los estilos de la vista
const styles = StyleSheet.create({
    PrincipalButton: {
        backgroundColor: '#87ceeb',
        marginTop: 60,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 7
    },
    TextButton: {
        color: '#fff',
    }
})

export default PrincipalButton