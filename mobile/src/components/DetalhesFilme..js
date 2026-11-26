import { useEffect, useState} from 'react';
import backendClient from '../utils/backendClient';
import { Pressable, Text, View, ScrollView, Image, StyleSheet} from 'react-native';
import Carregando from './Carregando';
import { formatarDuracao} from '../utils/formatacao';
import formatarNota from '../utils/formatacao';

export default function DetalhesFilme ({id, onVoltar}) {
  const [ filme, setFilme] = useState(null)
  const [ carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    async function buscarDetalhesFilme () {
        try{
            const resposta = await backendClient.get('/filme', {
                params: {
                    id: id
                }
            })
            setFilme(resposta.data)
            setCarregando(false)
        }
        catch(erro){
          if(erro.response && erro.response.data.mensagem){
            setErro(erro.response.data.mensagem)
          }
          else{
            setErro('Não foi possível carregar os detalhes')
          }
          setCarregando(false)
        }
    }
    buscarDetalhesFilme ()
  }, [id])
  let imagemFundo
  if (filme !== null && filme.fundo !== null){
    imagemFundo = (
      <Image style={styles.imagemDoFundo} source={{uri: filme.fundo}}/>
    )
  }
  let posterImagem
  if (filme !== null && filme.poster !== null){
      posterImagem=(
        <Image source={{uri: filme.poster}} style={styles.poster}/>
      )
  }
  else if (filme !== null){
    posterImagem=(
      <View style={styles.semPoster}>
        <Text>Sem pôster</Text>
      </View>
    )
  }
  let tituloFilme
  if(filme !== null){
    tituloFilme=(
      <View>
        <Text style={styles.titulo}>{filme.titulo}</Text>
      </View>
    )

  }
  let sinopseFilme

  if (filme !== null && filme.sinopse !== null) {
    sinopseFilme = (
        <Text style={styles.sinopse}>
            {filme.sinopse}
        </Text>
    )
  }
  let anoFilme

  if (filme !== null && filme.ano !== null) {
    anoFilme = (
        <Text style={styles.informacoes}>
            {filme.ano}
        </Text>
    )
  } 

  let duracaoFilme

  if (filme !== null && filme.duracao !== null) {
    duracaoFilme = (
        <Text style={styles.informacoes}>
            {formatarDuracao(filme.duracao)}
        </Text>
    )
  }

  let generosFilme

  if (filme !== null && filme.generos.length > 0) {
    generosFilme = (
        <Text style={styles.informacoes}>
            {filme.generos.join(' · ')}
        </Text>
    )
  }
  let separadorAnoDuracao
  let separadorDuracaoGenero
  let separadorAnoGenero
  if (filme !== null) {
      if (filme.ano !== null && filme.duracao !== null) {
          separadorAnoDuracao = <Text style={styles.informacoes}> · </Text>
      }

      if (filme.duracao !== null && filme.generos.length > 0) {
          separadorDuracaoGenero = <Text style={styles.informacoes}> · </Text>
      }
  }
  if (filme !== null) {
    if (filme.ano !== null && filme.duracao === null && filme.generos.length > 0) {
        separadorAnoGenero = <Text style={styles.informacoes}> · </Text>
    }
  }

  let notaFilme
  if (filme !== null) {
    notaFilme = <Text style={styles.nota}>{formatarNota(filme.nota)} </Text>
  }
  let conteudo
      if (carregando) {
          conteudo = <Carregando mensagem="Carregando os detalhes..." />
      }
      else if(erro) {
        conteudo = <Text style={styles.sinopse}>{erro}</Text>
      }
      else{
        conteudo = (
        <ScrollView>
          {imagemFundo}

        <View style={styles.containerDetalhes}>
          {posterImagem}

          <View style={styles.informacoesFilme}>
            {tituloFilme}

            <View style={styles.linhaInformacoes}>
                {anoFilme}
                {separadorAnoDuracao}
                {duracaoFilme}
                {separadorDuracaoGenero}
                {separadorAnoGenero}
                {generosFilme}
            </View>
              {notaFilme}
          </View>
        </View>
        <View>
          <Text style={styles.subtitulo}>Sinopse</Text>
          {sinopseFilme}
        </View>
      </ScrollView>
    )
      }

  return(
    <View style={styles.container}>
    <Pressable onPress={onVoltar} style={styles.botaoVoltar}>
        <Text style={styles.textoVoltar}>
            ‹ Voltar
        </Text>
    </Pressable>
      {conteudo}
    </View>

  )
}

const styles = StyleSheet.create({
  imagemDoFundo:{
    width: '100%',
    height: 180

  },
  poster:{
    width: 100,
    height: 150
  },
  semPoster: {
    width: 100,
    height: 150,
    borderRadius: 8,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titulo: {
    fontWeight: 'bold',
    color:'white',
    fontSize: 22
  },
  linhaInformacoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  informacoes: {
    color: 'white',
    marginRight: 6
  },
  sinopse: {
    color: 'white',
    marginTop: 10
  },
  containerDetalhes: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
    gap: 12
},
informacoesFilme: {
    flex: 1
},
subtitulo: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5
},
nota: {
    color: 'orange',
    marginTop: 5
}, 
botaoVoltar: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 10
},
textoVoltar: {
    color: 'white',
    fontSize: 15
}, 
container: {
    width: '100%',
    flex: 1
},
})
 