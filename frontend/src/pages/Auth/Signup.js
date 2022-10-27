// import des modules necessaires
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { accountService } from "@/_services/account.service"


// fonction Signup
const Signup = () => {

    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const initialValues = {
        nom: "",
        prenom: "",
        email: "",
        password: ""
    };

    useEffect(() => {
    }, [])

    const validationSchema = Yup.object().shape({
        nom: Yup.string().required("Veuillez entrer un nom"),
        prenom: Yup.string().required("Veuillez entrer un prénom"),
        email: Yup.string().email("Veuillez entrer une adresse email valide").required("Veuillez entrer votre adresse email"),
        password: Yup.string().required("Veuillez entrer un mot de passe")
    });

    const onSubmit = async (data) => {
        try {
            accountService.signupUser(data)
                .then(response => {
                    accountService.loginUser(data)
                        .then(response => {
                            accountService.saveToken(response.data.accessToken)
                            navigate("/home", { replace: true });
                        })
                        .catch(error => {
                            setMsg(error.response.data.msg);
                        })
                })
                .catch(error => {
                    setMsg(error.response.data.msg);
                })

        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (
        <>
            <main>
                <div className="columns columnsMain">
                    <div className="column"></div>
                    <div className="column is-half">
                        <div className="box">

                            <div className="message has-background-white">
                                <h2 className="message-header has-background-danger">S'enregistrer</h2>



                                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                                    <Form className='formAuth'>
                                        {msg ? (<p className="notification is-danger is-size-6 p-2 mt-1">{msg}</p>) : ("")}
                                        <div className="field">
                                            <label htmlFor='nom' className="label">Nom:</label>
                                            <div className="controls">
                                                <Field name="nom" type="text" placeholder="Votre Nom" autoComplete="on" className="input"></Field>
                                            </div>
                                            <ErrorMessage name="nom" component="p" className="notification is-danger is-light p-2 mt-1" />
                                        </div>
                                        <div className="field">
                                            <label htmlFor='prenom' className="label">Prénom:</label>
                                            <div className="controls">
                                                <Field name="prenom" type="text" placeholder="Votre Prénom" autoComplete="on" className="input"></Field>
                                            </div>
                                            <ErrorMessage name="prenom" component="p" className="notification is-danger is-light p-2 mt-1" />
                                        </div>
                                        <div className="field">
                                            <label htmlFor='email' className="label">Email:</label>
                                            <div className="controls">
                                                <Field name="email" type="text" placeholder="Email" autoComplete="on" className="input"></Field>
                                            </div>
                                            <ErrorMessage name="email" component="p" className="notification is-danger is-light p-2 mt-1" />
                                        </div>
                                        <div className="field">
                                            <label htmlFor='password' className="label">Mot de passe:</label>
                                            <div className="controls">
                                                <Field name="password" type="password" placeholder="******" autoComplete="off" className="input"></Field>
                                            </div>
                                            <ErrorMessage name="password" component="p" className="notification is-danger is-light p-2 mt-1" />
                                        </div>
                                        <div className="columns">
                                            <div className="column"></div>
                                            <div className="column"><button type='submit' className="button is-danger is-outlined butttonAuth">S'enregistrer</button></div>
                                            <div className="column"></div>
                                        </div>

                                    </Form>
                                </Formik>
                            </div>

                        </div>

                    </div>
                    <div className="column"></div>
                </div>

            </main>
        </>
    );
};

// export de la page Signup pour utilisation dans le router
export default Signup;