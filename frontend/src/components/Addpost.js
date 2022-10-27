// import des modules necessaires
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from 'react-router-dom';
import { accountService } from "@/_services/account.service";
import { postService } from "@/_services/post.service"
import reactImageSize from 'react-image-size';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

// fonction de la page addpost
const Addpost = () => {
    const [msg, setMsg] = useState('');
    const [postImg, setPostImg] = useState();
    const [ImagePreview, setImagePreview] = useState();
    const [ImagePreviewName, setImagePreviewName] = useState("");
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const initialValues = {
        text: ""
    }

    useEffect(() => {

    }, [])

    const onSubmit = async (data) => {
        const profil = accountService.tokenDecode(accountService.getToken())
        console.log(data)
        const formData = new FormData();
        formData.append('imageUrl', postImg);
        formData.append('text', data.text);
        formData.append('userId', profil.userId);

        try {
            postService.createPost(formData)
                .then(response => {
                    window.location.reload()
                })
                .catch(error => {
                    setMsg(error);
                })

        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    const close = () => {
        setOpen(false)
    }

    const onImageChange = async (event) => {

        setImagePreviewName(event.target.files[0].name)
        if (event.target.files && event.target.files[0]) {
            setImagePreview(URL.createObjectURL(event.target.files[0]));
        }
        try {
            const { width, height } = await reactImageSize(URL.createObjectURL(event.target.files[0]));
            if (width <= 10000 && height <= 10000) {
                setMsg();
                setPostImg(event.target.files[0]);
            } else {
                setMsg("Veuillez sélectionner une image dont les dimensions n'excédent pas 250x250");
            }
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (
        <>
            <div className='bouton-addPost'>
                <button className="js-modal-trigger button is-danger " data-target="modal-js-example" onClick={() => setOpen(true)}>
                    Créer un post
                </button>
            </div>
            <div className={open ? 'modal is-active' : 'modal'} >
                <div className="modal-background" onClick={() => close()}></div>
                <div className="modal-card">
                    <section className="modal-card-head">
                        <p className="modal-card-title">Créer une publication</p>
                        <button className="delete" aria-label="close" onClick={() => close()}></button>
                    </section>
                    <section className="modal-card-body">

                        <Formik initialValues={initialValues} onSubmit={onSubmit}>
                            <Form className="formAddPost">
                                <div className="box">
                                    {msg ? (<p className="notification is-danger is-size-6 p-2 mt-1">{msg}</p>) : ("")}
                                    <div className="field">
                                        <label htmlFor='image' className="label">Image du Post:</label>
                                        <div className="file is-danger fileBtnAddPost">
                                            <label className="file-label">
                                                <input className="file-input" type="file" name="resume" onChange={onImageChange} />
                                                <span className="file-cta">
                                                    <span className="file-icon">
                                                        <FontAwesomeIcon icon={faUpload} />
                                                    </span>
                                                    <span className="file-label">
                                                        Choisir un fichier…
                                                    </span>
                                                    <span className="file-labelName">
                                                        {ImagePreviewName}
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <figure className="image is-256x256">
                                            {ImagePreview ? (<img className='previs-image' key={ImagePreview} src={ImagePreview} alt="previsualisation du post" />) : ("")}
                                        </figure>
                                        <ErrorMessage name="title" component="p" className="notification is-danger is-light p-2 mt-1" />
                                    </div>

                                    <div className="field">
                                        <label htmlFor='text' className="label">Texte:</label>
                                        <div className="controls">
                                            <Field as="textarea" id="text" className="text" rows="6" name="text" placeholder="Quel est le sujet de votre post? "></Field>
                                        </div>
                                        <ErrorMessage name="text" component="p" className="notification is-danger is-light p-2 mt-1" />
                                    </div>

                                    <div className="columns">
                                        <div className="column"></div>
                                        <div className="column"><button type='submit' className="button is-danger is-outlined">Publier mon post</button></div>
                                        <div className="column"></div>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-danger" onClick={() => { close() }}>
                            Cancel
                        </button>
                    </footer>
                </div>
            </div>
        </>
    );
}

// export de la page pour appel dans le router
export default Addpost;