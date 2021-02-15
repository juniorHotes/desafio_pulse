import React, { FormEvent, ReactElement, useState, useEffect } from 'react'
import Header from '../../components/Header'
import Input from '../../components/Input'

function Login(): ReactElement {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const [user, setUser] = useState<any>()

    const [userData, setUserData] = useState([])

    useEffect(() => {
        const storage: any = localStorage.getItem("users")
        const data = JSON.parse(storage)

        console.log(data)

        setUserData(data)

    }, [])

    function handleUser(value: string) {
        setName(value)
        const isUserName = userData.find((e: any) => {
            return e.name == value
        });

        setUser(isUserName)
    }

    function handleAuthUser(e: FormEvent) {
        e.preventDefault()

        if(password == user?.password) {

        }

        if(password == user?.password) {
            console.log("pass ok")
        } else {
            console.log("pass not ok")
        }

    }
    return (
        <>
            <Header title={"Pulse"} isPageLogin={true} />
            <div className="container">
                <div className="container-register">
                    <form onSubmit={handleAuthUser} >
                        <h1>Entre com seu usuário</h1>

                        <Input inputType="text" label="Nome" name="name" placeholder="Ex: Jhon"
                            onChange={e => handleUser(e.target.value)}
                            value={name}
                        />

                        <Input inputType="password" label="Senha" name="password" placeholder="********"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        />

                        <button disabled={false} type="submit">Entrar</button>
                    </form>
                </div>

            </div>
        </>
    )
}

export default Login