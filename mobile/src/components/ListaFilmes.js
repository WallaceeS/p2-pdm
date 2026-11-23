import {View, Text, StyleSheet, FlatList} from 'react-native'
import CartaoFilme from './CartaoFilme'

export default function ListaFilmes ({titulo, filmes}){

    return(
    <View>
        <Text style={styles.titulo}>
            {titulo}
        </Text>
        <FlatList
            data={filmes}
            keyExtractor={(filme) => String(filme.id)}
            renderItem={({ item }) => <CartaoFilme titulo={item.titulo}
                                      ano={item.ano}
                                      nota={item.nota}
                                      poster={item.poster}/>}
                                      />
    </View>
    )
}

const styles = StyleSheet.create({
    titulo:{
        fontWeight:'bold',
        color:'white'
    }
})