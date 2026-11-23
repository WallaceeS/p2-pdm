import {View, Text, StyleSheet, ActivityIndicator} from 'react-native'

export default function Carregando ({mensagem}) {
    let mensagemRecebida = mensagem
    if(!mensagemRecebida){
        mensagemRecebida = 'Carregando...'
    }
    return (
        <View style={styles.alinharTexto}>
            <ActivityIndicator size="large" color="#E0473C">
            </ActivityIndicator>  
            <Text style={styles.cor}>
                {mensagemRecebida}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    alinharTexto:{
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    } ,
    cor:{
        color:'white'
    }

})

