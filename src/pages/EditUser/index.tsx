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

    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    //#region VALIDAÇÃO DE FORMULÁRIO
    const [vldName, setVldName] = useState<[string, string]>(["", ""])
    const [vldEmail, setVldEmail] = useState<[string, string]>(["", ""])
    const [vldPwd, setVldPwd] = useState<[string, string]>(["", ""])
    const [vldNewPwd, setVldNewPwd] = useState<[string, string]>(["", ""])
    const [vldNewConfirmPwd, setVldNewConfirmPwd] = useState<[string, string]>(["", ""])

    const validate = () => {
        let error = false

        setVldName(["valide", ""])
        setVldEmail(["valide", ""])
        setVldPwd(["valide", ""])
        setVldNewPwd(["valide", ""])
        setVldNewConfirmPwd(["valide", ""])

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

        // Valide a nova senha
        if (newPassword.length > 0 && newPassword.length < 8) {
            setVldNewPwd(["invalide", "Sua senha deve conter no mínimo 8 dígitos"])
            error = true
        }

        // Valide a confirmaçõa da nova senha
        if (confirmNewPassword.length > 0 && confirmNewPassword.length == 0 || confirmNewPassword != newPassword) {
            setVldNewConfirmPwd(["invalide", "Repita a mesma senha que dígitou acima"])
            error = true
        }

        // Valide a senha
        if (password.length == 0) {
            setVldPwd(["invalide", "Forneça sua senha antiga"])
            error = true
        }

        return !error
    }

    //#endregion

    function handleCreateUser(e: FormEvent) {
        e.preventDefault();

        if (validate()) {

            const storage: any = localStorage.getItem("users")

            const data = JSON.parse(storage)

            if (password != user.password) {
                setVldPwd(["invalide", "Senha incorreta"])
            } else {
                const isNewPass = newPassword ? newPassword : password
                const changes = {
                    id: user.id,
                    name: name,
                    email: email,
                    password: isNewPass
                }

                const index = data.findIndex((item: any) => {
                    return item.id == user.id
                })
                data.splice(index, 1, changes)

                localStorage.setItem("users", JSON.stringify(data))

                alert('Alterações realizadas com sucesso!')

                history.push('/')
            }
        }
    }

    function handleDeleteUser(e: FormEvent) {
        e.preventDefault();

        if (password.length == 0) {
            setVldPwd(["invalide", "Forneça sua senha"])
            return
        }

        if (password != user.password) {
            setVldPwd(["invalide", "Senha incorreta"])
        } else {
            const storage: any = localStorage.getItem("users")

            const data = JSON.parse(storage)

            const index = data.findIndex((item: any) => {
                return item.id == user.id
            })
            data.splice(index, 1)

            localStorage.setItem("users", JSON.stringify(data))

            alert('Conta excluída com sucesso!')

            history.push('/')
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
                            onChange={e => {
                                setVldName(["", ""])
                                setName(e.target.value)
                            }}
                            autoFocus={true}
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

                        <hr />
                        <h3>Editar senha</h3>
                        <Input inputType="password" label="Nova senha" name="new_password" placeholder="********"
                            onChange={e => {
                                setVldNewPwd(["", ""])
                                setNewPassword(e.target.value)
                            }}
                            value={newPassword}
                            validate={vldNewPwd}
                        />

                        <Input inputType="password" label="Repita a nova senha" name="confirm_password" placeholder="********"
                            onChange={e => {
                                setVldNewConfirmPwd(["", ""])
                                setConfirmNewPassword(e.target.value)
                            }}
                            value={confirmNewPassword}
                            validate={vldNewConfirmPwd}
                        />
                        <hr />
                        <h4>Forneça sua antiga senha para confirmar as alterações</h4>
                        <Input inputType="password" label="Senha antiga" name="password" placeholder="********"
                            onChange={e => {
                                setVldPwd(["", ""])
                                setPassword(e.target.value)
                            }}
                            value={password}
                            validate={vldPwd}
                        />

                        <button type="submit">Salvar</button>
                    </form>
                    <form onSubmit={handleDeleteUser} >
                        <button type="submit">Excuir conta</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditUser