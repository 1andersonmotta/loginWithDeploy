export function validType(type: string): boolean {
    const formatType = (type).toUpperCase()

    if (formatType == 'FORNECEDOR' || formatType == 'CLIENTE' || formatType == 'TRANSPORTADOR') {
        return true
    }
    return false
}

//Fornecedor, Cliente, Transportador