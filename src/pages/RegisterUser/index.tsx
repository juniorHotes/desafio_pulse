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

    // function validateName(value: string) {
    //     setName(value)

    //     if (value.length >= 4) {
    //         setVldName(["valide", ""])
    //     } else {
    //         setVldName(["invalide", "Forneça um nome maior que 4 caractérs"])
    //     } 
    //     if(value === "") setVldName(["", ""])
    // }

    // function validateEmail(value: string) {
    //     setEmail(value)
    //     const atSign = value.indexOf('@')

    //     if (atSign != -1) {
    //         setVldEmail(["valide", ""])
    //     } else {
    //         setVldEmail(["invalide", "Forneça um E-mail válido"])
    //     }
    //     if(value === "") setVldEmail(["", ""])
    // }

    // function validatePassword(value: string) {
    //     setPassword(value)

    //     if (value.length >= 8) {
    //         setValidatePwd(["valide", ""])
    //     } else {
    //         setValidatePwd(["invalide", "Sua senha deve conter no mínimo 8 dígitos"])
    //     }
    //     if(value === "") setValidatePwd(["", ""])
    // }

    // function validateConfirmPassword(value: string) {
    //     setConfirmPassword(value)

    //     if (value === password) {
    //         setVldConfirmPwd(["valide", ""])
    //     } else {
    //         setVldConfirmPwd(["invalide", "Repita a mesma senha que dígitou acima"])
    //     }
    //     if(value === "") setVldConfirmPwd(["", ""])
    // }

    function validateName() {
        if (name.length >= 4) {
            setVldName(["valide", ""])
        } 
        if (name.length < 4){
            setVldName(["invalide", "Forneça um nome maior que 4 caractérs"])
        } 
        if (name != '' && name.length >= 4) {
            setVldName(["valide", ""])
        } 
        if (name.length == 0) {
            setVldName(["invalide", "Forneça um nome"])
        }
    }

    function validateEmail() {
        const atSign = email.indexOf('@')

        if (atSign != -1) {
            setVldEmail(["valide", ""])
        } 
        if (atSign == -1){
            setVldEmail(["invalide", "Forneça um E-mail válido"])
        }
        if (email.length == 0) {
            setVldEmail(["invalide", "Forneça um e-mail"])
        }
    }

    function validatePassword() {
        if (password.length >= 8) {
            setValidatePwd(["valide", ""])
        } 
        if (password.length < 8) {
            setValidatePwd(["invalide", "Sua senha deve conter no mínimo 8 dígitos"])
        }
        if (password.length == 0) {
            setValidatePwd(["invalide", "Forneça uma senha"])
        }
    }

    function validateConfirmPassword() {

        if (confirmPassword == password && confirmPassword.length > 0) {
            setVldConfirmPwd(["valide", ""])
        } 
        if (confirmPassword.length > 0 && confirmPassword != password) {
            setVldConfirmPwd(["invalide", "Repita a mesma senha que dígitou acima"])
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

                alert('Você foi cadastado com sucesso!\nMuito obrigado!')

                history.push('/login')
            }
        }
    }
    return (
        <>
            <Header title={"Pulse"} btnLogin={true} />
            <div className="container">
                <div className="container-register">
                    <form onSubmit={handleCreateUser} >
                        <h1>Faça seu cadastro</h1>
                        <span>Todos os campos são obrigatórios</span>

                        <Input inputType="text" label="Nome" name="name" placeholder="Ex: Jhon"
                            autoFocus={true}
                            onChange={e => setName(e.target.value)}
                            onBlur={validateName}
                            value={name}
                            validate={vldName}
                        />

                        <Input inputType="text" label="Email" name="email" placeholder="Ex: exemplo@email.com"
                            onChange={e => setEmail(e.target.value)}
                            onBlur={validateEmail}
                            value={email}
                            validate={vldEmail}
                        />

                        <Input inputType="password" label="Senha" name="password" placeholder="********"
                            onChange={e => setPassword(e.target.value)}
                            onBlur={validatePassword}
                            value={password}
                            validate={vldPwd}
                        />

                        <Input inputType="password" label="Repita a senha" name="confirmPassword" placeholder="********"
                            onChange={e => setConfirmPassword(e.target.value)}
                            onBlur={validateConfirmPassword}
                            value={confirmPassword}
                            validate={vldConfirmPwd}
                        />

                        <button type="submit">Criar conta</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RegisterUser