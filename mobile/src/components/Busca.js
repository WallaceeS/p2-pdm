import { View, TextInput, Pressable, Text, StyleSheet, ActivityIndicator  } from 'react-native'

export default function Busca ({termo, onTermoAlterado,onLimpar, buscando}){
    let botaoLimpar

    if (termo !== ''){
        botaoLimpar = (
            <Pressable onPress={onLimpar}>
                <Text style={styles.botao}>✕</Text>
            </Pressable>
        )
    }
    let carregandoBusca

    if(buscando){
        carregandoBusca = <ActivityIndicator size="small" color="white"/>
    }

    return(
    <View style={styles.container}>
    <TextInput  style={styles.texto} value={termo} onChangeText={onTermoAlterado} placeholder='Digite o título de um filme' placeholderTextColor="grey"/>     
    {botaoLimpar}
    {carregandoBusca}
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
})