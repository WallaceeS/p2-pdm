import {View, Text, StyleSheet, Image} from 'react-native'
import formatarNota from '../utils/formatacao'

export default function CartaoFilme ({titulo, ano, nota, poster}) {
    let posterImagem
    let anoRecebido

    if (poster === null){
        posterImagem=(
            <View style={styles.semPoster}>
                <Text>Sem pôster</Text>
            </View>
        )
    }
    else{
        posterImagem=(
            <Image
                source={{ uri: poster }}
                style={styles.poster}
            />
        )
    }
    if (ano){
        anoRecebido=(
            <Text style={styles.ano}>
                {ano}
            </Text>
        )

        
    }

    return(
        <View style={styles.cartao}>
            {posterImagem}
            <View>
                <Text style={styles.titulo} numberOfLines={2}>
                    {titulo}
                </Text>
                    {anoRecebido}
                <Text style={styles.nota}>
                    {formatarNota(nota)}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
   poster: {
    width: 70,
    height: 105,
    borderRadius: 8
},
  semPoster: {
    width: 70,
    height: 105,
    borderRadius: 8,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cartao:{

    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#6D5A85',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10

  },
  titulo:{
    fontWeight: 'bold',
    color:'white'
  },
  nota: {
    color: "orange"
  },
  ano: {
    color: 'grey'
  }


})