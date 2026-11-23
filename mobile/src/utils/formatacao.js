export default function formatarNota(nota) {
    if (nota === 0 || nota === null) {
        return 'Sem nota'
    }
    let notaFormatada = nota.toFixed(1).replace('.',',')
    return `★ ${notaFormatada}`
}