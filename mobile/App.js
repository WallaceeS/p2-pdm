import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Cabecalho from './src/components/Cabecalho';
import Creditos from './src/components/Creditos';
import { useEffect, useState} from 'react';
import backendClient from './src/utils/backendClient';
import ListaFilmes from './src/components/ListaFilmes';
import Carregando from './src/components/Carregando';

export default function App() {
  const [ emAlta, setEmAlta] = useState([])
  const [ carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    async function buscarEmAlta() {
      try{
        const resposta = await backendClient.get(`/em-alta`)
        setEmAlta(resposta.data)
        setCarregando(false)
      }
      catch(erro){
        console.error(erro)
        setCarregando(false)
        setErro("Não foi possível carregar os filmes")
      }
      
    }
    buscarEmAlta()
  }, [])

  let conteudoPrincipal
  if (carregando) {
      conteudoPrincipal = <Carregando mensagem="Buscando os filmes em alta..." />
  }
  else if (erro) {
    conteudoPrincipal = <Text style={styles.cor}>{erro}</Text>
  }
  else {
      conteudoPrincipal = <ListaFilmes titulo='Em alta nesta semana' filmes={emAlta}/>
  }


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Cabecalho/>
        {conteudoPrincipal}
        <Creditos/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#1a0230',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cor:{
    color:'white'
  }
});
