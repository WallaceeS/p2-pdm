import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native'

export default function Busca ({termo, onTermoAlterado, onBuscar, onLimpar}){
    let botaoLimpar

    if (termo !== ''){
        botaoLimpar = (
            <Pressable onPress={onLimpar}>
                <Text style={styles.botao}>✕</Text>
            </Pressable>
        )
    }
    return(
    <View style={styles.container}>
    <Pressable onPress={onBuscar}>
        <Text style={styles.botaoBuscar}>Buscar</Text>
    </Pressable>
    <TextInput  style={styles.texto} value={termo} onChangeText={onTermoAlterado} placeholder='Digite o título de um filme' placeholderTextColor="grey"/>     
    {botaoLimpar}
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#6D5A85',
        borderRadius: 10,
        padding: 8,
        marginVertical: 15


    },
    texto: {
        flex: 1,
        color:'white'
    },
    botao:{
        color:'white'
    },
    botaoBuscar: {
    marginRight: 10,
    color: 'white'
    }

})