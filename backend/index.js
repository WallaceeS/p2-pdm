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

const port = 3000
app.listen(port, () => console.log(`Backend do OndePassa no ar. Porta: ${port}.`))