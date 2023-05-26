export function validNullable(dados: any) {
    const value = Object.values(dados)
    for (let dado of value) {
        if (!dado || String(Object.values(dado)) == '') {
            dado = 'Não Informado'
        }
    }
    return dados
}