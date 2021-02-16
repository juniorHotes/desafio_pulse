import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import Header from '../../components/Header'
import CardUser from '../../components/CardUser'
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';

function Home(): ReactElement {
    const history = useHistory()

    const storage: any = localStorage.getItem("users")
    const data = Object(JSON.parse(storage))

    if(storage != undefined)
        data.sort((a: any, b: any) => b.id - a.id)

    console.log(data)

    const [logged, setLogged] = useState(true)

    useEffect(() => {
        const session = sessionStorage.key(0)

        if (session == undefined) setLogged(false)
        else setLogged(true)
    }, [])

    function createCard() {
        if (storage == undefined) return <h1>Não há usuários cadastrados <br></br>
        Seja o primeiro e faça seu cadastro agora.</h1>
        else return data.map((e: any) =>
            <Link key={e?.id} to={`/edit/user/${e?.id}`} >
                <CardUser key={e?.id} name={e?.name} email={e?.email} />
            </Link >)
}

function logout() {
    sessionStorage.clear()
    alert("Sua sessão foi encerrada")
    setLogged(false)
    history.push('/login')
}

return (
    <main>
        <Header title={"Pulse"} btnRegister={!logged} btnLogin={!logged} btnLogout={logged} logout={logout} />
        <div className="container">
            <div className="container-cards">
                {createCard()}
            </div>
        </div>
        <Footer />
    </main>
)
}

export default Home