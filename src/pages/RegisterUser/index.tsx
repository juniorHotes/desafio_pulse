import React, { ReactElement, useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../../components/Header'
import Input from '../../components/Input'
import './styles.css'

/*========== CADASTRO DE USUÁRIO ==========*/
function RegisterUser(): ReactElement {
    const history = useHistory()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    //#region VALIDAÇÃO DE FORMULÁRIO
    const [vldName, setVldName] = useState<[string, string]>(["", ""])
    const [vldEmail, setVldEmail] = useState<[string, string]>(["", ""])
    const [vldPwd, setValidatePwd] = useState<[string, string]>(["", ""])
    const [vldConfirmPwd, setVldConfirmPwd] = useState<[string, string]>(["", ""])
    const [formValide, setFormValide] = useState(true)

    const [validated, setValidated] = useState([false,false,false,false])

    function ValidatedInputs(vld: any) {
        setValidated(vld)

        const confirmed = validated.every(item => item == true)

        confirmed ? setFormValide(false) : setFormValide(true)

        console.log(vld)
        console.log(confirmed)
    }
    
    function validateName(value: string) {
        setName(value)

        if (value.length >= 4) {
            setVldName(["valide", "Ok!"])
            ValidatedInputs([true,validated[1],validated[2],validated[3]])
        } else {
            setVldName(["invalide", "Forneça um nome maior que 4 caractérs"])
            ValidatedInputs([false,validated[1],validated[2],validated[3]])
        }
    }

    function validateEmail(value: string) {
        setEmail(value)
        const atSign = value.indexOf('@')

        if (atSign != -1) {
            setVldEmail(["valide", "Ok!"])
            ValidatedInputs([validated[0],true,validated[2],validated[3]])
        } else {
            setVldEmail(["invalide", "Forneça um E-mail válido"])
            ValidatedInputs([validated[0],false,validated[2],validated[3]])
        }

    }

    function validatePassword(value: string) {
        setPassword(value)

        if (value.length >= 8) {
            setValidatePwd(["valide", "Ok!"])
            ValidatedInputs([validated[0],validated[1],true,validated[3]])
        } else {
            setValidatePwd(["invalide", "Sua senha deve conter no mínimo 8 dígitos"])
            ValidatedInputs([validated[0],validated[1],false,validated[3]])
        }
    }

    function validateLikenPassword(value: string) {
        setConfirmPassword(value)

        if (value === password) {
            setVldConfirmPwd(["valide", "Ok!"])
            ValidatedInputs([validated[0],validated[1],validated[2],true])
        } else {
            setVldConfirmPwd(["invalide", "Repita a mesma senha que dígitou acima"])
            ValidatedInputs([validated[0],validated[1],validated[2],false])
        }
    }

    //#endregion

    function handleCreateUser(e: FormEvent) {
        e.preventDefault();

        const storage = localStorage.getItem("users")

        if (storage == undefined) {
            localStorage.setItem("users", JSON.stringify([{ id: 1, name, email, password }]))
        } else {
            const data = JSON.parse(storage)

            const userExist = data.find((user: any) => {
                if (user.name === name) {
                    setVldName(["invalide", "Este nome de usuário já existe, forneça um outro nome"])
                    return name
                } else {
                    setVldName(["valide", "Ok!"])
                }

                if (user.email == email) {
                    setVldEmail(["invalide", "Este email já está cadastrado, forneça um outro email"])
                    return email
                } else {
                    setVldEmail(["valide", "Ok!"])
                }
            })

            if (userExist == undefined) {
                const id = data.length + 1
                data.push({ id, name, email, password })

                localStorage.setItem("users", JSON.stringify(data))

                alert('Você foi cadastado com sucesso!\nVocê será redirecionado para página de login.\nMuito obrigado!')

                history.push('/login')
            }
        }
    }
    return (
        <>
            <Header title={"Pulse"} isPageRegister={true} />
            <div className="container">
                <div className="container-register">
                    <form onSubmit={handleCreateUser} >
                        <h1>Faça seu cadastro em nosso site</h1>
                        <span>Todos os campos são obrigatórios</span>

                        <Input inputType="text" label="Nome" name="name" placeholder="Ex: Jhon"
                            onChange={e => validateName(e.target.value)}
                            value={name}
                            validate={vldName}
                        />

                        <Input inputType="text" label="Email" name="email" placeholder="Ex: exemplo@email.com"
                            onChange={e => validateEmail(e.target.value)}
                            value={email}
                            validate={vldEmail}
                        />

                        <Input inputType="password" label="Senha" name="password" placeholder="********"
                            onChange={e => validatePassword(e.target.value)}
                            value={password}
                            validate={vldPwd}
                        />

                        <Input inputType="password" label="Repita a senha" name="confirmPassword" placeholder="********"
                            onChange={e => validateLikenPassword(e.target.value)}
                            value={confirmPassword}
                            validate={vldConfirmPwd}
                        />

                        <button disabled={formValide} type="submit">Criar conta</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RegisterUser