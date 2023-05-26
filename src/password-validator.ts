
export default class PasswordValid {
    constructor(readonly value: string) {
        this.validate();
    }

    public validate(): { message: string, isValid: boolean } {
        const checkPasswordLenght =
            this.value.length >= 8 && this.value.length <= 32;
        if (!checkPasswordLenght)
            return {
                message:
                    'Senha Inválida, a senha deve conter de 8 a 32 caracteres!',
                isValid: false
            };
        if (!this.checkContainsAnyLowerCase())
            return {
                message: 'Senha Inválida, acrescente uma letra minúscula!',
                isValid: false
            };
        if (!this.checkContainsAnyUppercaseLetter())
            return {
                message: 'Senha Inválida, acrescente uma letra Maiúscula!',
                isValid: false
            };
        if (this.checkContainsAnyBlankSpace())
            return {
                message: 'Senha Inválida, não deixe espaço em branco!',
                isValid: false
            };
        if (!this.checkContainsAnyNumber())
            return {
                message: 'Senha Inválida, acrescente um número!',
                isValid: false
            };
        if (this.checkContainsPunctuationAccentuationCharacter())
            return {
                message: 'Senha Inválida, caractere não permetido!',
                isValid: false
            };
        if (!this.checkAllowedSpecialCharacters())
            return {
                message: 'Senha Inválida, insira um caractere especial!',
                isValid: false
            };

        return { message: 'Senha Válida!!', isValid: true };
    }

    private checkContainsAnyLowerCase(): boolean {
        return /[a-z]/g.test(this.value);
    }

    private checkContainsAnyUppercaseLetter(): boolean {
        return /[A-Z]/g.test(this.value);
    }

    private checkContainsAnyBlankSpace(): boolean {
        return /[\s]/i.test(this.value);
    }

    private checkContainsAnyNumber(): boolean {
        return /[\d]/i.test(this.value);
    }

    private checkContainsPunctuationAccentuationCharacter(): boolean {
        return /(?=.*[}{~'ãáâêàẽéêĩíîìõóôòũúûù])/.test(this.value);
    }

    private checkAllowedSpecialCharacters(): boolean {
        return /(?=.*[ç!@#$%*()=+¨&*()<>:;.,?^`'\-_\|/])/.test(this.value);
    }
}
