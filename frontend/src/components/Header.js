// import des modules necessaires
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Header.css'
import Logo from '@/Images/icon-left-font-monochrome-white.svg'
import LogoUser from '@/Images/User.png'
import { accountService } from "@/_services/account.service";
import Addpost from "./Addpost"

// fonction d'affichage du header
const Header = () => {
    const navigate = useNavigate()
    const [isActive, setisActive] = useState(false);
    const [profil, setProfil] = useState([]);

    useEffect(() => {

    }, [])

    const functionGetProfil = async () => {
        const getProfil = await accountService.tokenDecode(accountService.getToken());
        if (getProfil) {
            setProfil(getProfil);
        }

    }

    const Logout = () => {
        accountService.logout();
        navigate("/auth/login", { replace: true })
    }
    // condition d'affichage si l'user est loggé
    if (accountService.isLogged()) {
        functionGetProfil()
        return (

            <header>
                <nav className="navbar is-transparent" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="/home">
                            <img src={Logo} alt="Groupomania" />
                        </a>
                        <a
                            onClick={() => {
                                setisActive(!isActive);
                            }}
                            role="button"
                            className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
                            aria-label="menu"
                            aria-expanded="false"
                            data-target="navbarBasicExample"
                        >
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>
                    <div
                        id="navbarBasicExample"
                        className={`navbar-menu ${isActive ? "is-active" : ""}`}
                    >
                        <div className="navbar-start">
                            <a className="navbar-item" href="/home">
                                <span className="items">Accueil</span>
                            </a>
                            <div>
                                <Addpost />
                            </div>
                        </div>

                        <div className="navbar-end">
                            <div className="navbar-item has-dropdown is-hoverable">
                                <div className="navbar-link" href="#">
                                    <div className="navbar-profile-name" > <p>{profil.prenom} {profil.nom}</p> </div> <img className="is-rounded" src={LogoUser} alt="dropdown logo" />
                                </div>
                                <div className="navbar-dropdown is-boxed">
                                    <a className="navbar-item is-active" onClick={Logout} >
                                        Déconnexion
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

        );
    } else { //condition si le user n'est pas loggé
        return (
            <header>
                <nav className="navbar is-transparent" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="/home">
                            <img src={Logo} alt="Groupomania" />
                        </a>
                        <a
                            onClick={() => {
                                setisActive(!isActive);
                            }}
                            role="button"
                            className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
                            aria-label="menu"
                            aria-expanded="false"
                            data-target="navbarBasicExample"
                        >
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>
                    <div
                        id="navbarBasicExample"
                        className={`navbar-menu ${isActive ? "is-active" : ""}`}
                    >
                        <div className="navbar-end">
                            <div className="navbar-item">
                                <Link to="auth/login"><span className="button is-danger is-outlined">Login</span></Link>
                            </div>
                            <div className="navbar-item">
                                <Link to="auth/signup"><span className="button is-danger">Inscription</span></Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        );
    };
};

// export du header pour l'utiliser dans le layout
export default Header