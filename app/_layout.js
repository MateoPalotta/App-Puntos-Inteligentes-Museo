import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';

function TabBarIcon({ name, color, isCentered = false }) {
  return (
    <View style={isCentered ? styles.centerButton : null}>
      <Ionicons 
        name={name} 
        size={isCentered ? 28 : 24} 
        color={isCentered ? '#fff' : color}
      />
    </View>
  );
}

export default function AppLayout() {
  const router = useRouter();

  const screenOptions = {
    tabBarLabelStyle: { 
      fontSize: 12,
      marginBottom: 5
    },
    tabBarStyle: { 
      position: 'absolute',
      bottom: 25,
      left: 20,
      right: 20,
      elevation: 5,
      backgroundColor: '#fff',
      borderRadius: 15,
      height: 60,
      paddingBottom: 5,
      paddingTop: 5,
      ...styles.shadow
    },
    headerShown: true,
    headerLeft: () => (
      <TouchableOpacity 
        onPress={() => router.back()}
        style={{ marginLeft: 15 }}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
    ),
  };

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen 
        name="map" 
        options={{ 
          title: 'Mapa',
          tabBarIcon: ({ color }) => <TabBarIcon name="location" color={color} />,
          tabBarLabel: "Mapa",
          headerTitle: "Ubicación del Museo",
          headerLeft: () => null // Oculta la flecha en la pantalla principal
        }} 
      />
      <Tabs.Screen 
        name="gallery" 
        options={{ 
          title: 'Vista Libre',
          tabBarIcon: ({ color }) => <TabBarIcon name="images" color={color} />,
          tabBarLabel: "Vista Libre",
          headerTitle: "Exposiciones",
          headerLeft: () => null // Oculta la flecha en la pantalla principal
        }} 
      />
      <Tabs.Screen 
        name="notifications" 
        options={{ 
          title: 'Avisos',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="notifications" color={color} isCentered={true} />
          ),
          tabBarLabel: "",
          headerTitle: "Avisos y Puntos Inteligentes",
          headerLeft: () => null // Oculta la flecha en la pantalla principal
        }} 
      />
      <Tabs.Screen 
        name="routes"
        options={{
          title: 'Rutas',
          tabBarIcon: ({ color }) => <TabBarIcon name="map-outline" color={color} />,
          tabBarLabel: "Rutas",
          headerTitle: "Rutas Disponibles",
          headerLeft: () => null // Oculta la flecha en la pantalla principal
        }}
      />
      <Tabs.Screen 
        name="alerts" 
        options={{ 
          title: 'Alerta',
          tabBarIcon: ({ color }) => <TabBarIcon name="alert-circle" color={color} />,
          tabBarLabel: "Alerta",
          headerTitle: "Enviar Alerta de Emergencia",
          headerLeft: () => null // Oculta la flecha en la pantalla principal
        }} 
      />
      
      {/* Pantallas con flecha de retroceso */}
      <Tabs.Screen 
        name="routeDetail"
        options={{
          href: null,
          headerTitle: "Detalle de Ruta"
        }}
      />
      <Tabs.Screen 
        name="exhibitionDetail"
        options={{
          href: null,
          headerTitle: "Detalle de Exposición"
        }}
      />
      <Tabs.Screen 
        name="information"
        options={{
          href: null,
          headerTitle: "Información del Punto Inteligente"
        }}
      />
      <Tabs.Screen 
        name="index"
        options={{
          href: null
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  centerButton: {
    backgroundColor: '#4285F4',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  }
}); 