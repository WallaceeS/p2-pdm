import {View, Text, StyleSheet} from 'react-native'

export default function Cabecalho() {
    return(
        <View>
            <Text style={styles.titulo}>
                🍿 OndePassa
            </Text>

            <Text style={styles.subtitulo}>
                Descubra onde assistir qualquer filme
            </Text>
        </View>
    );
}


const styles = StyleSheet.create ({
    titulo: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 28,

    }, 
    subtitulo: {
        fontSize: 19,
        color: 'grey'
    }
})