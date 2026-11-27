require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')
const token = process.env.TMDB_TOKEN

const tmdbClient = axios.create({
    baseURL:'https://api.themoviedb.org/3',
    headers: {
         Authorization: `Bearer ${token}`   
    },
    params:{
        language: 'pt-BR'
    }
})

const simplificarFilme = (filme) => {
   let dataLancamento = filme.release_date

   if(dataLancamento) {
    dataLancamento = dataLancamento.substr(0,4)
   }
   else{
    dataLancamento = null
   }

   let posterUrl = filme.poster_path

   if(posterUrl) {
    posterUrl = `https://image.tmdb.org/t/p/w342${filme.poster_path}`
   }
   else{
    posterUrl = null
   }
   return {
    id: filme.id,
    titulo: filme.title,
    ano: dataLancamento,
    nota: Number(filme.vote_average.toFixed(1)),
    poster: posterUrl
   }

}

const simplificarProvedores = (listaTmdb) => {
    if(listaTmdb){
        const simplificados = listaTmdb.map(provedor => {
            const logo = `https://image.tmdb.org/t/p/w92${provedor.logo_path}`
            return {
                "nome": provedor.provider_name,
                "logo": logo
            }
        })
        return simplificados
    }
    else{
        return []
    } 
}

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json({app: "OndePassa", status:"online"})

})

app.get('/em-alta', async (req, res) => {
    try{
        const resposta = await tmdbClient.get('/trending/movie/week')
        const filmes = resposta.data.results.map(simplificarFilme)

        res.json(filmes)
    }
    catch(erro) {

        res.status(502).json({
             "mensagem": "Não foi possível consultar o catálogo de filmes." 
        })
        console.error(erro)

    }
})

app.get('/filmes', async (req, res) => {
    const busca = req.query.busca
    console.log(`Busca: ${busca}`)
    if(!busca || busca.trim().length === 0){
        return res.status(400).json ({
            "mensagem": "Informe o título de um filme." 
        })
    }

    let termo = busca.trim()

    try {
        const resposta = await tmdbClient.get('/search/movie', {
            params: {
                query: termo,
                include_adult: false
            }

        })
        const filmes = resposta.data.results.map(simplificarFilme)
        res.json(filmes)

    }
    catch (erro){
        res.status(502).json({
            "mensagem": "Não foi possível consultar o catálogo de filmes."
        })
        console.error(erro)
    }
})

app.get('/filme', async (req,res) => {
    const filmeId = req.query.id

    if(!filmeId){
        return res.status(400).json ({
            "mensagem": "Informe o id do filme."
        })
    }
    try{
        const resposta = await tmdbClient.get(`/movie/${filmeId}`,{
            params: {
                append_to_response: 'watch/providers'
            }
        })
        const filme = simplificarFilme(resposta.data)

        let duracao = resposta.data.runtime
        if (!duracao || duracao === 0){
            duracao = null
        }
        let sinopse = resposta.data.overview
        if(!sinopse){
            sinopse = null
        }
        let fundo = resposta.data.backdrop_path
        if (fundo){
            fundo = `https://image.tmdb.org/t/p/w780${fundo}`
        }
        else{
            fundo = null
        }

        const generos = resposta.data.genres.map(genero => {
            return genero.name
        })
        let caminho = {}
        let provedor = resposta.data["watch/providers"]

        if (provedor && provedor.results && provedor.results.BR){
            caminho = provedor.results.BR
        }

        const assinatura = simplificarProvedores(caminho.flatrate)
        const aluguel = simplificarProvedores(caminho.rent)
        const compra = simplificarProvedores(caminho.buy)

        const ondeAssistir = {
            assinatura: assinatura,
            aluguel: aluguel,
            compra: compra
        }
        filme.generos = generos
        filme.duracao = duracao
        filme.sinopse = sinopse
        filme.fundo = fundo
        filme.ondeAssistir = ondeAssistir
        res.json(filme)

    }
    catch(erro){
        if(erro.response && erro.response.status === 404){
            return res.status(404).json ({
                "mensagem": "Filme não encontrado."
            })
        }
        res.status(502).json ({
            "mensagem": "Não foi possível consultar o catálogo de filmes."
            })
        console.error(erro)  
    }
})

const port = 3000
app.listen(port, () => console.log(`Backend do OndePassa no ar. Porta: ${port}.`))