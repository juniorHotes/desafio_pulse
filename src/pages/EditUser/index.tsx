import React, { ReactElement, useState, FormEvent } from 'react'
import Header from '../../components/Header'
import Input from '../../components/Input'
import './styles.css'

/*========== EDITAR USUÁRIO ==========*/
function EditUser(props: any): ReactElement {
    const storage: any = localStorage.getItem("users")
    const data = JSON.parse(storage)

    const user = data.filter((item: any) => item.id == props.match.params.id)[0]

    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState('')
    const [likenpassword, setLikenpassword] = useState('')

    //#region VALIDAÇÃO DE FORMULÁRIO
    const [vldName, setVldName] = useState<[string, string]>(["", ""])
    const [vldEmail, setVldEmail] = useState<[string, string]>(["", ""])
    const [vldPwd, setValidatePwd] = useState<[string, string]>(["", ""])
    const [vldLinkenPwd, setVldLikenPwd] = useState<[string, string]>(["", ""])
    const [formValide, setFormValide] = useState(true)

    function validateName(value: string) {
        setName(value)
        // value.length >= 4 ? setVldName(["valide", "Ok!"]) :
        //     setVldName(["invalide", "Forneça um nome maior que 4 caractérs"])
        if (value.length >= 4) {
            setVldName(["valide", "Ok!"])
            setFormValide(false)
        } else {
            setVldName(["invalide", "Forneça um nome maior que 4 caractérs"])
            setFormValide(true)
        }

    }

    function validateEmail(value: string) {
        setEmail(value)
        const atSign = value.indexOf('@')
        // atSign != -1 ? setVldEmail(["valide", "Ok!"]) :
        //     setVldEmail(["invalide", "Forneça um E-mail válido"])
        if (atSign != -1) {
            setVldEmail(["valide", "Ok!"])
            setFormValide(false)
        } else {
            setVldEmail(["invalide", "Forneça um E-mail válido"])
            setFormValide(true)
        }

    }

    function validatePassword(value: string) {
        setPassword(value)
        // value.length >= 8 ? setValidatePwd(["valide", "Ok!"]) :
        //     setValidatePwd(["invalide", "Sua senha deve conter no mínimo 8 dígitos"])

        if (value.length >= 8) {
            setValidatePwd(["valide", "Ok!"])
            setFormValide(false)
        } else {
            setValidatePwd(["invalide", "Sua senha deve conter no mínimo 8 dígitos"])
            setFormValide(true)
        }

    }

    function validateLikenPassword(value: string) {
        setLikenpassword(value)
        value === password ? setVldLikenPwd(["valide", "Ok!"]) :
            setVldLikenPwd(["invalide", "Repita a mesma senha que dígitou acima"])

        if (value === password) {
            setVldLikenPwd(["valide", "Ok!"])
            setFormValide(false)
        } else {
            setVldLikenPwd(["invalide", "Repita a mesma senha que dígitou acima"])
            setFormValide(true)
        }

    }

    //#endregion
    
    function handleCreateUser(e: FormEvent) {
        e.preventDefault();

        const storage = localStorage.getItem("users")

        if (storage == undefined) {
            localStorage.setItem("users", JSON.stringify([{ id: 1, name, email, password }]))
            console.log(localStorage.getItem("users"))
        } else {
            const data = JSON.parse(storage)

            const userExist = data.filter((e: any) => {
                if (e.name === name) {
                    setVldName(["invalide", "Este nome já existe, forneça um outro nome"])
                    return name
                } else {
                    setVldName(["valide", "Ok!"])
                }

                // if(e.email == email) {
                //     setVldEmail(["invalide", "Este email já está cadastrado, forneça um outro email"])
                //     return email
                // } else {
                //     setVldEmail(["valide", "Ok!"])
                // }
            })

            console.log(userExist)

            const id = data.length + 1
            data.push({ id, name, email, password })

            // localStorage.setItem("users", JSON.stringify(data))

            console.log(data)
        }
    }

    return (
        <>
            <Header title={"Pulse"} isPageRegister={true} />
            <div className="container">
                <div className="container-register">
                    <form onSubmit={handleCreateUser} >
                        <h1>Edite seus dados de cadastro</h1>
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

                        <Input inputType="password" label="Repita a senha" name="likenpassword" placeholder="********"
                            onChange={e => validateLikenPassword(e.target.value)}
                            value={likenpassword}
                            validate={vldLinkenPwd}
                        />

                        <button disabled={formValide} type="submit">Criar conta</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditUser