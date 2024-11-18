import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const GalleryScreen = () => {
    const router = useRouter();
    const [exhibitions] = useState([
        {
            id: 1,
            title: "El Matador",
            image: "https://bacap.com.ar/wp-content/uploads/2024/04/obra-de-Antonio-Berni-681x1024.jpeg",
            description: "El Matador es una emblemática obra del artista argentino Antonio Berni, creada en 1964. Esta pieza pertenece a su serie de 'Juanito Laguna', en la cual Berni retrata la vida y las luchas de un niño de un barrio marginal en Buenos Aires, utilizando el arte como una forma de crítica social y denuncia de las desigualdades. En El Matador, Berni combina pintura y collage, utilizando materiales reciclados y desechos industriales para dar vida a la escena. La obra representa a Juanito Laguna en el acto de 'torear' de manera simbólica, con un toro improvisado hecho de objetos descartados. Esta escena es una alegoría del ingenio y la creatividad en medio de la pobreza, destacando cómo los niños convierten su entorno adverso en un espacio de juego y expresión. Berni utiliza su característico estilo neofigurativo, mezclando técnicas tradicionales y elementos tridimensionales, para reflejar tanto la cruda realidad como la esperanza y resistencia del personaje. El Matador es una obra profundamente significativa, que habla del poder de la imaginación frente a las limitaciones económicas y sociales.",
            artist: "Antonio Berni",
            year: "1964"
        },
        // Añade más exposiciones aquí
    ]);

    const handleExhibitionPress = (exhibition) => {
        router.push({
            pathname: "/exhibitionDetail",
            params: exhibition
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Exposiciones Actuales</Text>
            <FlatList
                data={exhibitions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.exhibitionItem}
                        onPress={() => handleExhibitionPress(item)}
                        accessibilityLabel={`Exposición ${item.title} por ${item.artist}`}
                    >
                        <Image 
                            source={{ uri: item.image }}
                            style={styles.exhibitionImage}
                            accessibilityLabel={`Imagen de ${item.title}`}
                        />
                        <View style={styles.exhibitionInfo}>
                            <Text style={styles.exhibitionTitle}>{item.title}</Text>
                            <Text style={styles.exhibitionArtist}>{item.artist}, {item.year}</Text>
                            <Text style={styles.exhibitionLocation}>{item.location}</Text>
                        </View>
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
    exhibitionItem: {
        marginBottom: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    exhibitionImage: {
        width: '100%',
        height: 200,
    },
    exhibitionInfo: {
        padding: 15,
    },
    exhibitionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    exhibitionArtist: {
        fontSize: 14,
        color: '#666',
        marginBottom: 3,
    },
    exhibitionLocation: {
        fontSize: 12,
        color: '#888',
    }
});

export default GalleryScreen; 