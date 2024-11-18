import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, Linking, Platform } from 'react-native';
import * as Location from 'expo-location';
import * as Speech from 'expo-speech';

const AlertScreen = () => {
    const [loading, setLoading] = useState(false);

    const openSettings = async () => {
        try {
            if (Platform.OS === 'ios') {
                await Linking.openURL('app-settings:');
            } else {
                await Linking.openSettings();
            }
        } catch (error) {
            console.error('Error al abrir configuración:', error);
        }
    };

    const requestLocationPermission = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error al solicitar permisos:', error);
            return false;
        }
    };

    const sendAlert = async () => {
        setLoading(true);
        try {
            const hasPermission = await requestLocationPermission();
            
            if (!hasPermission) {
                const message = 'Se requiere acceso a la ubicación para enviar la alerta. Por favor, habilita los permisos en la configuración.';
                Speech.speak(message);
                Alert.alert(
                    'Permiso Requerido',
                    message,
                    [
                        { 
                            text: 'Ir a Configuración', 
                            onPress: openSettings 
                        },
                        { 
                            text: 'Cancelar',
                            style: 'cancel'
                        }
                    ]
                );
                return;
            }

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High
            });

            // Aquí iría tu llamada a la API para enviar la alerta
            // const response = await axios.post('tu-api/alerts', { 
            //     latitude: location.coords.latitude,
            //     longitude: location.coords.longitude
            // });

            const successMessage = 'Alerta enviada correctamente. El personal ha sido notificado de tu ubicación.';
            Speech.speak(successMessage);
            Alert.alert('Éxito', successMessage);

        } catch (error) {
            console.error('Error al enviar alerta:', error);
            const errorMessage = 'No se pudo enviar la alerta. Por favor, intenta nuevamente.';
            Speech.speak(errorMessage);
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enviar Alerta de Emergencia</Text>
            <Text style={styles.description}>
                Presiona el botón para enviar una alerta con tu ubicación actual.
            </Text>
            <View style={styles.buttonContainer}>
                <Button 
                    title={loading ? "Enviando..." : "Enviar Alerta"}
                    onPress={sendAlert}
                    disabled={loading}
                    color="#ff4444"
                    accessibilityLabel="Toca dos veces para enviar una alerta con tu ubicación"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
        color: '#666'
    },
    buttonContainer: {
        width: '100%',
        maxWidth: 300,
        marginTop: 20
    }
});

export default AlertScreen;
