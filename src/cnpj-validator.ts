export function validarCNPJ(cnpj: string): boolean {
    // Remove caracteres não numéricos
    cnpj = cnpj.replace(/[^\d]+/g, '');

    // Verifica se o CNPJ possui 14 dígitos
    if (cnpj.length !== 14) {
        return false;
    }

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cnpj)) {
        return false;
    }

    // Validação do primeiro dígito verificador
    let sum = 0;
    let weight = 5;
    for (let i = 0; i < 12; i++) {
        sum += parseInt(cnpj[i]) * weight;
        weight--;
        if (weight < 2) {
            weight = 9;
        }
    }
    let digit = 11 - (sum % 11);
    if (digit > 9) {
        digit = 0;
    }
    if (parseInt(cnpj[12]) !== digit) {
        return false;
    }

    // Validação do segundo dígito verificador
    sum = 0;
    weight = 6;
    for (let i = 0; i < 13; i++) {
        sum += parseInt(cnpj[i]) * weight;
        weight--;
        if (weight < 2) {
            weight = 9;
        }
    }
    digit = 11 - (sum % 11);
    if (digit > 9) {
        digit = 0;
    }
    if (parseInt(cnpj[13]) !== digit) {
        return false;
    }

    return true;
}

// Exemplo de uso
const cnpj = '00.000.000/0001-01';
if (validarCNPJ(cnpj)) {
    console.log(`${cnpj} é válido.`);
} else {
    console.log(`${cnpj} é inválido.`);
}
