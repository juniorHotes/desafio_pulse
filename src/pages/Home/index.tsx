import React, { ReactElement, useEffect, useState } from 'react';
import Header from '../../components/Header'
import CardUser from '../../components/CardUser'
import { Link } from 'react-router-dom';

function Home(): ReactElement {
    const storage: any = localStorage.getItem("users")
    const data = JSON.parse(storage)

    const [logged, setLogged] = useState(true)

    useEffect(() => {
        const session = sessionStorage.key(0)

        if (session == undefined) setLogged(false)
        else setLogged(true)
    }, [])

    function createCard() {
        if (storage == undefined) return <h2>Não há usuários cadastrados <br></br>
        Seja o primeiro e faça seu cadastro agora.</h2>
        else return data.map((e: any) =>
            <Link key={e?.id} to={`/edit/user/${e?.id}`} >
                <CardUser key={e?.id} name={e?.name} email={e?.email} />
            </Link >)
}

function logout() {
    sessionStorage.clear()
    alert("Sua sessão foi encerrada")
    setLogged(false)
}

return (
    <>
        <Header title={"Pulse"} btnRegister={!logged} btnLogin={!logged} btnLogout={logged} logout={logout} />
        <div className="container">
            {createCard()}
        </div>
    </>
)
}

export default Home