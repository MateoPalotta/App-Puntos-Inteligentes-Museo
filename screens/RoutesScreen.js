import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as Speech from 'expo-speech';

const RoutesScreen = () => {
    const router = useRouter();
    const [routes] = useState([
        {
            id: 1,
            name: "Arte Contemporáneo",
            description: "Recorrido por las obras más destacadas",
            details: "Este recorrido incluye las principales obras de arte contemporáneo del museo. Comenzaremos en el hall principal, donde podrás apreciar las últimas adquisiciones del museo. Luego, continuaremos por la sala principal donde se exhiben obras de artistas argentinos contemporáneos.",
            duration: "45 minutos"
        },
        {
            id: 2,
            name: "Exposición Temporal",
            description: "Muestra actual del mes",
            details: "Exposición temporal que presenta obras de artistas locales. La muestra incluye pinturas, esculturas y instalaciones multimedia que reflejan la diversidad cultural de Mar del Plata.",
            duration: "30 minutos"
        }
    ]);

    const handleRoutePress = (route) => {
        Speech.speak(`Has seleccionado la ruta ${route.name}`);
        router.push({
            pathname: "/routeDetail",
            params: {
                id: route.id,
                name: route.name,
                description: route.description,
                details: route.details,
                duration: route.duration
            }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rutas Disponibles</Text>
            <FlatList
                data={routes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.routeItem}
                        onPress={() => handleRoutePress(item)}
                        accessibilityLabel={`Ruta ${item.name}. ${item.description}`}
                    >
                        <Text style={styles.routeName}>{item.name}</Text>
                        <Text style={styles.routeDescription}>{item.description}</Text>
                        <Text style={styles.routeInfo}>Duración: {item.duration}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
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
        textAlign: 'center'
    },
    routeItem: {
        padding: 15,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    routeName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    routeDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    routeInfo: {
        fontSize: 12,
        color: '#888',
    },
});

export default RoutesScreen;
