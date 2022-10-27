// import des modules necessaires
import React, { useEffect, useState } from 'react';

import { Formik, Form, Field, ErrorMessage } from "formik";
import reactImageSize from 'react-image-size';

import { accountService } from "@/_services/account.service"
import { postService } from "@/_services/post.service"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfStroke, faUpload, faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { FaHeart, FaRegHeart } from 'react-icons/fa'

import 'moment/locale/fr';
import Moment from 'react-moment';

// fonction de la page Home
const Home = () => {

    const [Profil, SetProfil] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [allPosts, setAllPosts] = useState([]);

    const [msg, setMsg] = useState('');
    const [FieldValueHidden, setFieldValue] = useState("");
    const [ImagePreview, setImagePreview] = useState();
    const [ImagePreviewName, setImagePreviewName] = useState("");
    const [postImg, setPostImg] = useState();

    const [load, setLoad] = useState(false)

    const initialValues = {
        text: "",
    }

    useEffect(() => {
        FunctionProfil();
        FunctionAllUsers();
        FunctionAllPosts()
    }, [load])

    const FunctionProfil = () => {
        const GetProfil = accountService.tokenDecode(accountService.getToken());
        SetProfil(GetProfil);
    }

    const FunctionAllUsers = async () => {
        const GetAlluser = await accountService.getAllUsers();
        setAllUsers(GetAlluser.data);
    }

    const FunctionAllPosts = async () => {
        const getAllPosts = await postService.getAllPosts();
        setAllPosts(getAllPosts.data.reverse());
    }

    const deletePost = (data) => {

        postService.deletePost(data)
            .then(() => {
                setLoad(l => !l)
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const likedPost = (postId, likes) => {
        postService.likedPost(postId, likes)
            .then(() => {
                setLoad(l => !l)
            })
            .catch((error) => {
                console.log(error);
            })
    };

    function openModal(index) {
        // Add is-active class on the modal
        document.getElementById("modal" + index).classList.add("is-active");
    }

    // Function to close the modal
    function closeModal(index) {
        document.getElementById("modal" + index).classList.remove("is-active");
    }

    const onSubmitModif = async (data) => {
        const formData = new FormData();
        formData.append('imageUrl', postImg);
        if (data.text === '') {
            formData.append('text', FieldValueHidden.post.text);
        } else {
            formData.append('text', data.text);
        }
        formData.append('userId', FieldValueHidden.post.userId);
        formData.append('id', FieldValueHidden.post._id)

        try {
            postService.modifyPost(formData)
                .then(response => {
                    window.location.reload();
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

    const ProfilUser = () => {
        return (
            <div className="card">
                <div className="card-content">
                    <div className="content BoxInfo">
                        <h2 className="name is-size-5">{Profil.nom} {Profil.prenom}</h2>
                        <div className="centerImageProfil">
                            <figure className="image is-128x128 profile-pic">
                                <img className="is-rounded" alt="Profil avatar" src={Profil.imageUrl} />
                            </figure>
                        </div>

                        <div className="renseignement">
                            <h3 className="bio is-size-5">Biographie</h3>
                            <span className="is-divider"></span>
                            <p>{Profil.presentation} </p>
                            <br />

                            <h3 className="email is-size-5">email</h3>
                            <span className="is-divider"></span>
                            <p className=" is-size-6">{Profil.email}</p>
                            <br />

                            <h3 className="inscription is-size-5">Inscription</h3>
                            <span className="is-divider"></span>
                            <p className=" is-size-6">{<Moment format="DD/MM/YYYY">{Profil.createdAt}</Moment>}</p>
                            <br />

                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const displayAllUsers = allUsers.map((user) => {
        return (
            <li className="user" key={user._id}>
                <img src={user.imageUrl} alt="profil avatar" key={user.nom} />
                <span className="nom" key={user.avatar}>
                    {user.role === 1 ? <FontAwesomeIcon icon={faStarHalfStroke} /> : null} {user.nom}<br />@{user.prenom}
                </span>

            </li>
        )
    });


    const displayAllPosts = allPosts.map((posts, index) => {

        return (
            //ajouter modify post et delete post quand auteur du post, ajouter like post, on rajoute des icônes pour embellir
            <li className="card card-posts" key={posts.post._id}>

                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                            <figure className="image is-48x48">
                                <img src={posts.user.imageUrl} alt="ImageUser" />
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-4">{posts.user.nom}</p>
                        </div>
                    </div>
                    <div className="card-image">
                        {posts.post.imageUrl !== 'undefined' ? (
                            <figure className="image is-4by3">
                                <img src={"http://localhost:3000/images/postImg/" + posts.post.imageUrl} alt="ImagePost" />
                            </figure>) : ("")}

                    </div>
                    <div className="content">
                        <p>{posts.post.text}</p>

                        <div className='posts-likes'>
                            <span className="iconModify" onClick={() => {
                                let likes = 1
                                if (posts.post.usersLiked.includes(Profil.userId) === true) {
                                    likes = -1
                                }
                                likedPost(posts.post._id, likes)
                            }}>
                                {
                                    (posts.post.usersLiked.includes(Profil.userId) === true) ? <FaHeart className='heartstyle' /> : <FaRegHeart className='heartstyle' />
                                }
                                {posts.post.likes}
                            </span>
                        </div>

                        <div className="field has-addons ">
                            {posts.post.userId === Profil.userId || Profil.role === 1 ? (
                                <span className='post-del-mod'>
                                    <div className='post-mod' onClick={() => { openModal(index); }} >
                                        <span className="iconModify">
                                            <FontAwesomeIcon icon={faPenToSquare} className="js-modal-trigger fa fa-trash" />
                                        </span>
                                    </div>
                                    <div className='post-del' onClick={() => {
                                        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce post?")) {
                                            deletePost(posts.post._id);
                                        }
                                    }}>
                                        <span className="iconDelete"><FontAwesomeIcon icon={faTrashCan} className="fa fa-trash"
                                        />
                                        </span>
                                    </div>
                                </span>
                            ) : ('')}
                        </div>
                    </div>
                </div>

                <div className="modal" id={"modal" + index}>
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">
                                Modifier mon post
                            </p>
                            <button className="delete" onClick={() => { closeModal(index); }} aria-label="close">
                            </button>
                        </header>
                        <section className="modal-card-body">
                            <div className="box">
                                <div className="message has-background-white">
                                    <Formik initialValues={initialValues} onSubmit={onSubmitModif}>
                                        <Form className="formAddPost">
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
                                                    <Field as="textarea" id="text" className="text" rows="6" name="text" placeholder={posts.post.text}></Field>
                                                </div>

                                                <input type="hidden" value={posts.post.userId} name="hiddenField" />

                                                <ErrorMessage name="text" component="p" className="notification is-danger is-light p-2 mt-1" />
                                            </div>
                                            <div className="columns">
                                                <div className="column"></div>
                                                <div className="column"><button type='submit' className="button is-danger is-outlined" onClick={() => { setFieldValue(posts); }} >Modifier mon post</button></div>
                                                <div className="column"></div>
                                            </div>
                                        </Form>
                                    </Formik>
                                </div>
                            </div>


                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-danger" onClick={() => { closeModal(index); }}>
                                Cancel

                            </button>
                        </footer>
                    </div>
                </div>
            </li >
        )
    })



    return (
        <>
            <main>
                <div className="columns">
                    <section className="column is-one-fifth">{ProfilUser()}</section>
                    <section className="column is-half margin">{displayAllPosts}</section>
                    <section className="column">
                        <div className="card ">
                            <div className="card-content">
                                <div className="content">
                                    <aside className="asideHome">
                                        <div className="divContainer">
                                            <h2 className="h2user">Utilisateurs</h2>
                                            <span className="is-divider"></span>
                                            <br />
                                            <ul className="eachUser">{displayAllUsers}</ul>
                                        </div>
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <footer>
                <p>
                    Copyright Groupomania™ Group
                </p>
            </footer>
        </>

    );

};

// export de la page pour utilisation dans le router
export default Home;