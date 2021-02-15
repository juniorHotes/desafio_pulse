import React, { ReactElement, useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../../components/Header'
import Input from '../../components/Input'
import './styles.css'

/*========== EDITAR USUÁRIO ==========*/
function EditUser(props: any): ReactElement {
    const history = useHistory()

    const storage: any = localStorage.getItem("users")
    const data = JSON.parse(storage)

    const user = data.filter((item: any) => item.id == props.match.params.id)[0]

    console.log(data)

    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    //#region VALIDAÇÃO DE FORMULÁRIO
    const [vldName, setVldName] = useState<[string, string]>(["", ""])
    const [vldEmail, setVldEmail] = useState<[string, string]>(["", ""])
    const [vldPwd, setValidatePwd] = useState<[string, string]>(["", ""])
    const [vldConfirmPwd, setVldConfirmPwd] = useState<[string, string]>(["", ""])
    
    function validateName(value: string) {
        setName(value)

        if (value.length >= 4) {
            setVldName(["valide", ""])
        } else {
            setVldName(["invalide", "Forneça um nome maior que 4 caractérs"])
        } 
        if(value === "") setVldName(["", ""])
    }

    function validateEmail(value: string) {
        setEmail(value)
        const atSign = value.indexOf('@')

        if (atSign != -1) {
            setVldEmail(["valide", ""])
        } else {
            setVldEmail(["invalide", "Forneça um E-mail válido"])
        }
        if(value === "") setVldEmail(["", ""])
    }

    function validatePassword(value: string) {
        setPassword(value)

        if (value.length >= 8) {
            setValidatePwd(["valide", ""])
        } else {
            setValidatePwd(["invalide", "Sua senha deve conter no mínimo 8 dígitos"])
        }
        if(value === "") setValidatePwd(["", ""])
    }

    function validateConfirmPassword(value: string) {
        setConfirmPassword(value)

        if (value === password) {
            setVldConfirmPwd(["valide", ""])
        } else {
            setVldConfirmPwd(["invalide", "Repita a mesma senha que dígitou acima"])
        }
        if(value === "") setVldConfirmPwd(["", ""])
    }

    //#endregion

    function handleCreateUser(e: FormEvent) {
        e.preventDefault();

        if (storage == undefined) {
            localStorage.setItem("users", JSON.stringify([{ id: 1, name, email, password }]))
        } else {

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

                history.push('/')
            }
        }
    }

    return (
        <>
            <Header title={"Pulse"} btnRegister={false} btnLogin={false} btnLogout={true} />
            <div className="container">
                <div className="container-register">
                    <form onSubmit={handleCreateUser} >
                        <h1>Edite seus dados de cadastro</h1>
                        <span>Edite apenas os dados que desejar</span>

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

                        <h3>Editar senha</h3>

                        <Input inputType="password" label="Nova senha" name="new_password" placeholder="********"
                            onChange={e => validateConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            validate={vldConfirmPwd}
                        />

                        <Input inputType="password" label="Repita a nova senha" name="confirm_password" placeholder="********"
                            onChange={e => validateConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            validate={vldConfirmPwd}
                        />
                        <hr/>
                        <h4>Forneça sua antiga senha para confirmar as alterações</h4>
                        <Input inputType="password" label="Senha antiga" name="password" placeholder="********"
                            onChange={e => validatePassword(e.target.value)}
                            value={password}
                            validate={vldPwd}
                        />

                        <button type="submit">Salvar</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditUser