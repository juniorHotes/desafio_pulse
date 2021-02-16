import React, { ReactElement, useState, FormEvent, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../../components/Header'
import Input from '../../components/Input'
import './styles.css'

/*========== EDITAR USUÁRIO ==========*/
function EditUser(props: any): ReactElement {
    const history = useHistory()

    useEffect(() => {
        const storage: any = localStorage.getItem("users")
        const data = JSON.parse(storage)

        const user = data.filter((item: any) => item.id == props.match.params.id)[0]
        setUser(user)

        setName(user.name)
        setEmail(user.email)
    }, [])

    const [user, setUser] = useState<any>()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [newName, setNewName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    //#region VALIDAÇÃO DE FORMULÁRIO
    const [vldName, setVldName] = useState<[string, string]>(["", ""])
    const [vldEmail, setVldEmail] = useState<[string, string]>(["", ""])
    const [vldPwd, setVldPwd] = useState<[string, string]>(["", ""])
    const [vldNewPwd, setVldNewPwd] = useState<[string, string]>(["", ""])
    const [vldNewConfirmPwd, setVldNewConfirmPwd] = useState<[string, string]>(["", ""])

    function validateName(value: string) {
        setName(value)

        if (value.length >= 4) {
            setVldName(["valide", ""])
        } else {
            setVldName(["invalide", "Forneça um nome maior que 4 caractérs"])
        }
        if (value === "") setVldName(["", ""])
    }

    function validateEmail(value: string) {
        setEmail(value)
        const atSign = value.indexOf('@')

        if (atSign != -1) {
            setVldEmail(["valide", ""])
        } else {
            setVldEmail(["invalide", "Forneça um E-mail válido"])
        }
        if (value === "") setVldEmail(["", ""])
    }

    function validateNewPassword(value: string) {
        setNewPassword(value)

        if (value.length >= 8) {
            setVldNewPwd(["valide", ""])
        } else {
            setVldNewPwd(["invalide", "Sua senha deve conter no mínimo 8 dígitos"])
        }
        if (value === "") setVldNewPwd(["", ""])
    }

    function validateNewConfirmPassword(value: string) {
        setConfirmNewPassword(value)

        if (value === newPassword) {
            setVldNewConfirmPwd(["valide", ""])
        } else {
            setVldNewConfirmPwd(["invalide", "Repita a mesma senha que dígitou acima"])
        }
        if (value === "") setVldNewConfirmPwd(["", ""])
    }

    //#endregion

    function handleCreateUser(e: FormEvent) {
        e.preventDefault();

        const storage: any = localStorage.getItem("users")

        const data = JSON.parse(storage)

        const userExist = data.find((user: any) => {
            if (user.name === newName) {
                setVldName(["invalide", "Este nome de usuário já existe, forneça um outro nome"])
                return name
            } else {
                setVldName(["valide", ""])
            }

            if (user.email == newEmail) {
                setVldEmail(["invalide", "Este email já está cadastrado, forneça um outro email"])
                return email
            } else {
                setVldEmail(["valide", ""])
            }
        })

        if (password != user.password) {
            setVldPwd(["invalide", "Senha incorreta"])
        } else {

            if (userExist == undefined) {
                const isNewName = newName ? newName : name
                const isNewEmail = newEmail ? newEmail : email
                const isNewPassword = newPassword ? newPassword : password

                const changes = {
                    id: user.id,
                    name: isNewName,
                    email: isNewEmail,
                    password: isNewPassword
                }

                console.log(changes)
                const index = data.findIndex((item: any) => {
                    return item.id == user.id
                })
                console.log(index)
                data.splice(index, 1, changes)
                console.log(data)

                localStorage.setItem("users", JSON.stringify(data))

                alert('Alterações realizadas com sucesso!')

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
                        <span>Você pode editar apenas os dados que desejar</span>

                        <Input inputType="text" label="Nome" name="name" placeholder="Ex: Jhon"
                            onChange={e => validateName(e.target.value)} 
                            autoFocus={true}
                            value={name}
                            validate={vldName}
                        />

                        <Input inputType="text" label="Email" name="email" placeholder="Ex: exemplo@email.com"
                            onChange={e => validateEmail(e.target.value)}
                            value={email}
                            validate={vldEmail}
                        />

                        <hr/>
                        <h3>Editar senha</h3>
                        <Input inputType="password" label="Nova senha" name="new_password" placeholder="********"
                            onChange={e => validateNewPassword(e.target.value)}
                            value={newPassword}
                            validate={vldNewPwd}
                        />

                        <Input inputType="password" label="Repita a nova senha" name="confirm_password" placeholder="********"
                            onChange={e => validateNewConfirmPassword(e.target.value)}
                            value={confirmNewPassword}
                            validate={vldNewConfirmPwd}
                        />
                        <hr />
                        <h4>Forneça sua antiga senha para confirmar as alterações</h4>
                        <Input inputType="password" label="Senha antiga" name="password" placeholder="********"
                            onChange={e => {
                                setVldPwd(["", ""])
                                setPassword(e.target.value)
                            } }
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