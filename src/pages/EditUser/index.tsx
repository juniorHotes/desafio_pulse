import React, { ReactElement, useState, FormEvent } from 'react'
import Header from '../../components/Header'
import Input from '../../components/Input'
import './styles.css'

/*========== EDITAR USUÁRIO ==========*/
function EditUser(props: any): ReactElement {
    const storage: any = localStorage.getItem("users")
    const data = JSON.parse(storage)

    const user = data.filter((item: any) => item.id == props.match.params.id)[0]

    console.log(data)

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

                        <Input inputType="password" label="Nova senha" name="likenpassword" placeholder="********"
                            onChange={e => validateLikenPassword(e.target.value)}
                            value={likenpassword}
                            validate={vldLinkenPwd}
                        />

                        <Input inputType="password" label="Repita a nova senha" name="likenpassword" placeholder="********"
                            onChange={e => validateLikenPassword(e.target.value)}
                            value={likenpassword}
                            validate={vldLinkenPwd}
                        />

                        <Input inputType="password" label="Antiga senha" name="password" placeholder="********"
                            onChange={e => validatePassword(e.target.value)}
                            value={password}
                            validate={vldPwd}
                        />

                        <button disabled={formValide} type="submit">Salvar</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditUser