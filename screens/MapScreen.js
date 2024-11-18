import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Speech from 'expo-speech';

const MapScreen = () => {
    const marLocation = {
        latitude: -37.9783,
        longitude: -57.5478,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    };

    const speakLocation = () => {
        Speech.speak('El MAR - Museo de Arte Contemporáneo se encuentra en Avenida Félix U. Camet 800, Mar del Plata.');
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={marLocation}
                showsUserLocation={true}
                showsMyLocationButton={true}
            >
                <Marker
                    coordinate={{
                        latitude: marLocation.latitude,
                        longitude: marLocation.longitude
                    }}
                    title="MAR - Museo de Arte Contemporáneo"
                    description="Av. Félix U. Camet 800, Mar del Plata"
                    onPress={speakLocation}
                />
            </MapView>

            <View style={styles.infoContainer}>
                <Text style={styles.title}>MAR - Museo de Arte Contemporáneo</Text>
                <Text style={styles.address}>Av. Félix U. Camet 800, Mar del Plata</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 90,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.7,
    },
    infoContainer: {
        padding: 15,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    address: {
        fontSize: 14,
        color: '#666',
    }
});

export default MapScreen;
