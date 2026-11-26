import { View, Image, Text, ScrollView, StyleSheet } from 'react-native'

export default function Provedores({titulo, provedores}){
    if (provedores.length === 0){
        return null
    }
    else{
        return(

        <View>
            <Text style={styles.titulo}>
                {titulo}
            </Text>
            <ScrollView horizontal>
                {provedores.map((provedor) => {
                    return(
                        <View key={provedor.nome} style={styles.item}>
                            <Image
                                source={{uri: provedor.logo}}
                                style={styles.logo}
                            />
                            <Text style={styles.nome} numberOfLines={2}>{provedor.nome}</Text>
                        </View>
                    )
                    
                })}
            </ScrollView>
        </View>
        )
    }

}
const styles = StyleSheet.create({
    logo: {
    width: 56,
    height: 56,
    borderRadius: 8
    },
    nome: {
    fontSize: 11,
    textAlign: 'center',
    color: 'white',
    marginTop: 6
    },
    item: {
    alignItems: 'center',
    marginRight: 12,
    width: 70
    },
    titulo: {
    color: 'white',
    fontSize: 16,
    marginBottom: 8
}
})