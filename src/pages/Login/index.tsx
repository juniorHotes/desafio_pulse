import React, { FormEvent, ReactElement, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../../components/Header'
import Input from '../../components/Input'

function Login(): ReactElement {
    const history = useHistory()

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const [vldName, setVldName] = useState<[string, string]>(["", ""])
    const [vldPwd, setValidatePwd] = useState<[string, string]>(["", ""])

    const [user, setUser] = useState<any>()

    const [userData, setUserData] = useState([])

    useEffect(() => {
        const storage: any = localStorage.getItem("users")
        const data = JSON.parse(storage)

        console.log(data)

        setUserData(data)

    }, [])


    function handleUser(value: string) {
        setVldName(["", ""])

        setName(value)
        const isUserName = userData.find((e: any) => {
            return e.name == value || e.email == value 
        });

        setUser(isUserName)
    }

    function handleAuthUser(e: FormEvent) {
        e.preventDefault()

        if (user == undefined) {
            setVldName(["invalide", "Este usuário não está cadastrado"])
        } else {
            setVldName(["", ""])

            if (password == user?.password) {
                setValidatePwd(["", ""])

                sessionStorage.setItem(user.name, user.name)

                alert("Login feito com sucesso")
                history.push('/')
            } else {
                setValidatePwd(["invalide", "Senha incorreta"])
            }    
        }
    }
    return (
        <>
            <Header title={"Pulse"} btnRegister={true} />
            <div className="container">
                <div className="container-register">
                    <form onSubmit={handleAuthUser} >
                        <h1>Entre com seu usuário</h1>

                        <Input inputType="text" label="Nome ou e-mail" name="name" placeholder="Ex: Jhon ou exemplo@email.com"
                            onChange={e => handleUser(e.target.value)}
                            value={name}
                            validate={vldName}
                        />

                        <Input inputType="password" label="Senha" name="password" placeholder="********"
                            onChange={e => { 
                                setPassword(e.target.value)
                                setValidatePwd(["", ""])
                            }}
                            value={password}
                            validate={vldPwd}
                        />

                        <button disabled={false} type="submit">Entrar</button>
                    </form>
                </div>

            </div>
        </>
    )
}

export default Login