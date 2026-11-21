import {View, Text, StyleSheet} from 'react-native'

export default function Creditos() {
    return(
        <View>
            <Text style={styles.creditos}>
                Este produto usa a API do TMDB, mas não é endossado nem certificado pelo TMDB.
            </Text>
        </View>
    )
}


const styles = StyleSheet.create ({
    creditos: {
        textAlign: 'center',
        color: 'grey',
        fontSize: 15

    }
})