import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as Speech from 'expo-speech';

const ExhibitionDetailScreen = () => {
    const params = useLocalSearchParams();

    const narrateContent = () => {
        Speech.stop();
        
        const text = `${params.title} por ${params.artist}, del año ${params.year}. ${params.description}`;
        
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
            <Image 
                source={{ uri: params.image }}
                style={styles.image}
                accessibilityLabel={`Imagen de ${params.title}`}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{params.title}</Text>
                <Text style={styles.artist}>{params.artist}, {params.year}</Text>
                <Text style={styles.technique}>{params.technique}</Text>
                <Text style={styles.location}>Ubicación: {params.location}</Text>
                <Text style={styles.description}>{params.description}</Text>
                <View style={styles.buttonContainer}>
                    <Button 
                        title="Narrar Descripción"
                        onPress={narrateContent}
                        accessibilityLabel="Toca dos veces para escuchar la descripción de la obra"
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    infoContainer: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    artist: {
        fontSize: 18,
        color: '#666',
        marginBottom: 5,
    },
    technique: {
        fontSize: 16,
        color: '#888',
        marginBottom: 5,
    },
    location: {
        fontSize: 16,
        color: '#888',
        marginBottom: 15,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
    },
    buttonContainer: {
        marginTop: 10,
    }
});

export default ExhibitionDetailScreen; 