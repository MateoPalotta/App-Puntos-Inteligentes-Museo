import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';
import { useLocalSearchParams } from 'expo-router';

const InfoScreen = () => {
    const params = useLocalSearchParams();
    const title = params.title || "Información no disponible";
    const description = params.description || "No hay descripción disponible";

    const narrateContent = () => {
        const textToSpeak = `${title}. ${description}`;
        Speech.speak(textToSpeak, {
            language: 'es-ES',
            pitch: 1.0,
            rate: 0.8, // Velocidad más lenta para mejor comprensión
        });
    };

    // Narrar automáticamente al cargar
    React.useEffect(() => {
        narrateContent();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title} accessibilityRole="header">
                {title}
            </Text>
            <Text style={styles.description} accessibilityRole="text">
                {description}
            </Text>
            <Button 
                title="Repetir Mensaje"
                onPress={narrateContent}
                accessibilityLabel="Toca dos veces para repetir el mensaje"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    description: {
        fontSize: 20,
        marginBottom: 30,
        textAlign: 'center',
        lineHeight: 28
    }
});

export default InfoScreen;
