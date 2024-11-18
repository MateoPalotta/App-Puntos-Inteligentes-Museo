import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, AccessibilityInfo } from 'react-native';
import * as Speech from 'expo-speech';
import { useRouter } from 'expo-router';

const NotificationScreen = () => {
    const [currentMessage, setCurrentMessage] = useState(null);
    const router = useRouter();

    // Simular recepción de punto inteligente
    useEffect(() => {
        // Aquí iría la lógica real de recepción de puntos inteligentes
        const message = {
            title: "Punto Inteligente Detectado",
            description: "Estás cerca de la entrada principal. ¿Deseas escuchar más información?"
        };
        
        setCurrentMessage(message);
        // Anunciar automáticamente usando TalkBack/VoiceOver
        Speech.speak("Nuevo punto inteligente detectado. Toca dos veces para escuchar la información.");
    }, []);

    const handleAcceptInfo = () => {
        router.push({
            pathname: "/information",
            params: {
                title: currentMessage.title,
                description: currentMessage.description
            }
        });
    };

    const handleIgnore = () => {
        setCurrentMessage(null);
        Speech.speak("Mensaje ignorado");
    };

    return (
        <View style={styles.container}>
            {currentMessage ? (
                <>
                    <Text style={styles.title} accessibilityRole="header">
                        {currentMessage.title}
                    </Text>
                    <View style={styles.buttonContainer}>
                        <Button 
                            title="Escuchar Información"
                            onPress={handleAcceptInfo}
                            accessibilityLabel="Toca dos veces para escuchar la información del punto"
                        />
                        <Button 
                            title="Ignorar"
                            onPress={handleIgnore}
                            accessibilityLabel="Toca dos veces para ignorar este mensaje"
                        />
                    </View>
                </>
            ) : (
                <Text style={styles.noMessage} accessibilityRole="text">
                    No hay nuevos puntos inteligentes detectados
                </Text>
            )}
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
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center'
    },
    buttonContainer: {
        width: '100%',
        gap: 20
    },
    noMessage: {
        fontSize: 18,
        textAlign: 'center'
    }
});

export default NotificationScreen;
