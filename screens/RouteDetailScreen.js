import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as Speech from 'expo-speech';

const RouteDetailScreen = () => {
    const params = useLocalSearchParams();

    const narrateContent = () => {
        Speech.stop();
        const text = `${params.name}. ${params.details}. Duración aproximada: ${params.duration}`;
        
        Speech.speak(text, {
            language: 'es-ES',
            rate: 0.8,
            onDone: () => {
                console.log('Narración completada');
            }
        });
    };

    useEffect(() => {
        narrateContent();
        return () => {
            Speech.stop();
        };
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{params.name}</Text>
            <Text style={styles.description}>{params.details}</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Duración: {params.duration}</Text>
            </View>
            <Button 
                title="Narrar Nuevamente"
                onPress={narrateContent}
                accessibilityLabel="Toca dos veces para escuchar la descripción nuevamente"
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
    },
    infoContainer: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    infoText: {
        fontSize: 14,
        marginBottom: 5,
    },
});

export default RouteDetailScreen; 