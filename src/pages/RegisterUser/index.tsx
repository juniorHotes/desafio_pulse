import React, { ReactElement, useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Input from '../../components/Input'

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

    const validate = () => {
        let error = false

        setVldName(["valide", ""])
        setVldEmail(["valide", ""])
        setValidatePwd(["valide", ""])
        setVldConfirmPwd(["valide", ""])

        // Valide o nome
        if (name.length < 4) {
            setVldName(["invalide", "Forneça um nome maior que 4 caractérs"])
            error = true
        }
        if (name.length == 0) {
            setVldName(["invalide", "Forneça um nome"])
            error = true
        }

        // Valide o E-mail
        const atSign = email.indexOf('@')

        if (atSign == -1) {
            setVldEmail(["invalide", "Forneça um E-mail válido"])
            error = true
        }
        if (email.length == 0) {
            setVldEmail(["invalide", "Forneça um e-mail"])
            error = true
        }

        // Valide a senha
        if (password.length < 8) {
            setValidatePwd(["invalide", "Sua senha deve conter no mínimo 8 dígitos"])
            error = true
        }
        if (password.length == 0) {
            setValidatePwd(["invalide", "Forneça uma senha"])
            error = true
        }

        // Valide a confirmaçõa da senha
        if (confirmPassword.length == 0 || confirmPassword != password) {
            setVldConfirmPwd(["invalide", "Repita a mesma senha que dígitou acima"])
            error = true
        }

        return !error
    }
    //#endregion

    function handleCreateUser(e: FormEvent) {
        e.preventDefault();

        if (validate()) {
            const storage = localStorage.getItem("users")

            if (storage == undefined) {
                localStorage.setItem("users", JSON.stringify([{ id: 1, name, email, password }]))

                alert('Você foi cadastado com sucesso!\nMuito obrigado!')

                history.push('/login')
            } else {
                const data = JSON.parse(storage)

                const userExist = data.find((user: any) => {
                    if (user.name === name) {
                        setVldName(["invalide", "Este nome de usuário já existe, forneça um outro nome"])
                        return name
                    } else {
                        setVldName(["valide", ""])
                    }

                    if (user.email == email) {
                        setVldEmail(["invalide", "Este email já está cadastrado, forneça um outro email"])
                        return email
                    } else {
                        setVldEmail(["valide", ""])
                    }
                })

                if (userExist == undefined) {
                    const id = data[data.length -1].id +1
                    data.push({ id, name, email, password })

                    localStorage.setItem("users", JSON.stringify(data))

                    alert('Você foi cadastado com sucesso!\nMuito obrigado!')

                    history.push('/login')
                }
            }
        }
    }
    return (
        <main>
            <Header title={"Pulse"} btnLogin={true} />
            <div className="container">
                <div className="container-form">
                    <form onSubmit={handleCreateUser} >
                        <h1>Faça seu cadastro</h1>
                        <span>Todos os campos são obrigatórios</span>

                        <div className="container-profile">
                            <input type="file" name="Foto" id="foto"/>

                        </div>

                        <Input inputType="text" label="Nome" name="name" placeholder="Ex: Jhon"
                            autoFocus={true}
                            onChange={e => {
                                setVldName(["", ""])
                                setName(e.target.value)
                            }}
                            value={name}
                            validate={vldName}
                        />

                        <Input inputType="text" label="Email" name="email" placeholder="Ex: exemplo@email.com"
                            onChange={e => {
                                setVldEmail(["", ""])
                                setEmail(e.target.value)
                            }}
                            value={email}
                            validate={vldEmail}
                        />

                        <Input inputType="password" label="Senha" name="password" placeholder="********"
                            onChange={e => {
                                setValidatePwd(["", ""])
                                setPassword(e.target.value)
                            }}
                            value={password}
                            validate={vldPwd}
                        />

                        <Input inputType="password" label="Repita a senha" name="confirmPassword" placeholder="********"
                            onChange={e => {
                                setVldConfirmPwd(["", ""])
                                setConfirmPassword(e.target.value)
                            }}
                            value={confirmPassword}
                            validate={vldConfirmPwd}
                        />

                        <button type="submit">Criar conta</button>
                    </form>
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default RegisterUser