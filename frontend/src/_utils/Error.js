// import des modules necessaire
import React from 'react';
import image from "@/Images/depositphotos_9199988-stock-photo-oops-icon.jpg"
import { useNavigate } from 'react-router-dom';

// affichage de la page d'erreur
const Error = () => {
    const navigate = useNavigate()
    const Retour = (() => {
        navigate("/home", { replace: true });
    })
    return (
        <main>
            <div className="columns">

                <div className="column"></div>

                <div className="column is-three-fifths">
                    <div className="box is-large agencement ">

                        <h1 className="titleError has-text-centered">Error 404</h1>
                        <p className="has-text-centered ErrorPolice">La page que vous voulez n'existe pas</p>
                        <img src={image} alt='error' className='imagesize' />
                        <div className='Errorbutton'>
                            <button onClick={Retour} className="button is-danger is-outlined ">Home</button>
                        </div>

                    </div>

                </div>
                <div className="column"></div>
            </div>
        </main>
    );
};

// export de la page d'erreur pour etre appelé dans le routage
export default Error;