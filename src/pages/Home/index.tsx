import React, { ReactElement } from 'react';
import Header from '../../components/Header'
import CardUser from '../../components/CardUser'
import { Link } from 'react-router-dom';

function Home(): ReactElement {
    const storage: any = localStorage.getItem("users")
    const data = JSON.parse(storage)

    function createCard() {
        if(storage == undefined) return <h2>Não há usuários cadastrados <br></br> Seja o primeiro e faça seu cadastro.</h2>
        else return data.map((e: any) =>
            <Link key={e?.id} to={`/edit/user/${e?.id}`} >
                <CardUser key={e?.id} name={e?.name} email={e?.email} />
            </Link>)
    }

    return (
        <>
            <Header title={"Pulse"} />
            <div className="container">
                {createCard()}
            </div>
        </>
    )
}

export default Home