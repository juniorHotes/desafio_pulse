import React, { ReactElement } from 'react';
import Header from '../../components/Header'
import CardUser from '../../components/CardUser'
import { Link } from 'react-router-dom';

function Home(): ReactElement {
    const storage: any = localStorage.getItem("users")
    const data = JSON.parse(storage)

    return (
        <>
            <Header title={"Pulse"} />
            <div className="container">
                <h1>Página Home</h1>
                {data.map((e: any) =>
                    <Link key={e?.id} to={`/edit/user/${e?.id}`} >
                        <CardUser key={e?.id} name={e?.name} email={e?.email} />
                    </Link>)}
            </div>
        </>
    )
}

export default Home