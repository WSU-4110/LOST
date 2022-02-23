import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const Button = (props) => {
    return (
        <TouchableOpacity style={styles.buttonBody}>
            <Text style={styles.buttonText}>{ props.children }</Text>
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    buttonBody: {
        backgroundColor: '#00aeef',
        width: '80%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8,
        marginBottom : 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 30,
        fontWeight: '600',
        marginHorizontal: 20
    }
});



export { Button };