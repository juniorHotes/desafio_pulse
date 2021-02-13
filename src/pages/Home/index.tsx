import React, { ReactElement } from 'react';
import Header from '../../components/Header'

function Home(): ReactElement {
    return (
        <>
            <Header title={"Pulse"} />
            <div className="container">
                <h1>Página Home</h1>
            </div>
        </>
    )
}

export default Home