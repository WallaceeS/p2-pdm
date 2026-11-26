import {View, Text, StyleSheet, FlatList} from 'react-native'
import CartaoFilme from './CartaoFilme'

export default function ListaFilmes ({titulo, filmes, onSelecionar}){

    return(
    <View style={styles.ajuste}>
        <Text style={styles.titulo}>
            {titulo}
        </Text>
        <FlatList style={{ flex: 1}}
            data={filmes}
            keyExtractor={(filme) => String(filme.id)}
            renderItem={({ item }) => <CartaoFilme titulo={item.titulo}
                                      ano={item.ano}
                                      nota={item.nota}
                                      poster={item.poster}
                                      id={item.id}
                                      onSelecionar={onSelecionar}/>}
                                      />
    </View>
    )
}

const styles = StyleSheet.create({
    titulo:{
        fontWeight:'bold',
        color:'white',
        marginBottom: 12
    },
    ajuste: {
        flex: 1
    }
})