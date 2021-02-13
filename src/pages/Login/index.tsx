import React, { ReactElement } from 'react'
import Header from '../../components/Header'

function Login(): ReactElement {
    return (
        <>
            <Header title={"Pulse"} isPageLogin={true} />
            <div className="container">
                <h1>Página de login</h1>
            </div>
        </>
    )
}

export default Login