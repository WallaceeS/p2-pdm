export default function formatarNota(nota) {
    if (nota === 0 || nota === null) {
        return 'Sem nota'
    }
    let notaFormatada = nota.toFixed(1).replace('.',',')
    return `★ ${notaFormatada}`
}

export function formatarDuracao(duracaoFilme){
    if (duracaoFilme === null){
        return null
    }

    let horasFilme = Math.floor(duracaoFilme / 60)
    let minutosFilme = duracaoFilme % 60
    if(horasFilme > 0 && minutosFilme > 0){
        return `${horasFilme}h ${minutosFilme}min`
    }
    else if (horasFilme > 0){
        return `${horasFilme}h`
    }
    else{
        return `${minutosFilme}min`
    }

}