import React, { ReactElement, useState, FormEvent } from 'react'
import Header from '../../components/Header'
import Input from '../../components/Input'
import './styles.css'

function RegisterUser(): ReactElement {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [likenpassword, setLikenpassword] = useState('')

    function validatePassword(event: object) {
        // setLikenpassword(event.target.value)
        // if (event === password) {
        //     console.log("Senha ok!")
        //     event.target.style.outlineColor = "initial"
        //     event.target.style.borderColor = "initial"
        // } else {
        //     console.log("Senha diferente!")
        //     event.target.style.outlineColor = "#FF0000"
        //     event.target.style.borderColor = "#FF0000"
        // }
    }
    function handleCreateUser(e: FormEvent) {
        e.preventDefault();

        console.log(name)
        console.log(email)
        console.log(password)
    }
    return (
        <>
            <Header title={"Pulse"} isPageRegister={true} />
            <div className="container">
                <div className="container-register">
                    <form onSubmit={handleCreateUser} >
                        <h1>Página de cadastro de usuário</h1>
                        <span>Todos os campos são obrigatórioss</span>
                        <Input label="Nome*" name="name"
                            value={name} onChange={e => setName(e.target.value)} />
                        <Input label="Email*" name="email"
                            value={email} onChange={e => {
                                setEmail(e.target.value)
                                const atSign = e.target.value.indexOf('@')
                                console.log(atSign)
                            }} />

                        <Input label="Senha*" name="password"
                            value={password} onChange={e => setPassword(e.target.value)} />

                        <Input label="Repita a senha*" name="likenpassword"
                            value={likenpassword} onChange={e => validatePassword(e)} />
                        <button type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RegisterUser