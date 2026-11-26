import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Cabecalho from './src/components/Cabecalho';
import Creditos from './src/components/Creditos';
import { useEffect, useState} from 'react';
import backendClient from './src/utils/backendClient';
import ListaFilmes from './src/components/ListaFilmes';
import Carregando from './src/components/Carregando';
import Busca from './src/components/Busca';

export default function App() {
  const [ emAlta, setEmAlta] = useState([])
  const [ carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [termo, setTermo] = useState('')
  const [termoBuscado, setTermoBuscado] = useState('')
  const [resultados, setResultados] = useState(null)

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

    async function buscarFilmes() {
        try{
          setCarregando(true)
          const resposta = await backendClient.get('/filmes',{
            params: {
              busca: termo
            }
          })
          setResultados(resposta.data)
          setTermoBuscado(termo)
          setErro(null)
          setCarregando(false)
        }
        catch(erro){
          if(erro.response && erro.response.data.mensagem){
            setErro(erro.response.data.mensagem)
          }
          else{
            setErro('Não foi possível buscar os filmes')
          }
          setCarregando(false)
        }
    }

    function limparBusca(){
      setTermo('')
      setResultados(null)
      setErro(null)
    }
  


  let conteudoPrincipal
  if (carregando && emAlta.length === 0) {
      conteudoPrincipal = <Carregando mensagem="Buscando os filmes em alta..." />
  }
  else if (carregando && emAlta.length > 0){
    conteudoPrincipal = <Carregando mensagem="Procurando filmes..." />
  }
  else if (erro) {
    conteudoPrincipal = <Text style={styles.cor}>{erro}</Text>
  }
  else if(resultados !== null && resultados.length === 0){
    conteudoPrincipal = <Text style={styles.cor}>Nenhum filme encontrado para  “{termoBuscado}”.</Text>
  }
  else if (resultados !== null){
    conteudoPrincipal = <ListaFilmes titulo={`Resultados para “${termoBuscado}”`} filmes={resultados}/>
  }

  else {
      conteudoPrincipal = <ListaFilmes titulo='Em alta nesta semana' filmes={emAlta}/>
  }


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Cabecalho/>
        <Busca termo={termo} onTermoAlterado={setTermo} onBuscar={buscarFilmes} onLimpar={limparBusca}/>
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
