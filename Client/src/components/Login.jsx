import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'

import api from '../services/api';

export default function Login({ setToken }) {

    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const data = {
        email,
        pass: password
    }


    const handleSubmit = async e => {
        e.preventDefault();
        console.log(email);


        api.post('/login', data)
            .then((res) => {

                if (res.data.erro) {
                    let erros = res.data.erro.map((erro) => {
                        return erro.texto + '\n'
                    })

                    alert(erros)
                }

                if (res.data.payload && res.data.token) {

                    console.log(res.data.payload)

                    localStorage.setItem('payload', JSON.stringify(res.data.payload))
                    localStorage.setItem('token', JSON.stringify(res.data.token))
                    localStorage.setItem('email',res.data.payload.email);
                    return navigate("/dashboard");
                }

            })
            .catch(err => {

                console.log(err)

            })

        /*if(email === "admin@gmail.com" && password === "1234567"){
            setToken(email); 
            localStorage.setItem('email',email);
            navigate("/dashboard");
        }
        */

    }

    return (
        <section className="admin-panel-form">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-left-part">
                            <div className="form-top">
                                <div className="brand">
                                    <a href="#"><img src="images/brand.png" alt="" /></a>
                                </div>
                                <div className="admin-tittle">
                                    <p>Faça login no painel</p>
                                </div>
                            </div>
                            <form className="form" onSubmit={handleSubmit}>
                                <div className="mb-3 ">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Nome do usuário</label>
                                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Digite seu nome de usuário" onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div className="mb-3 form-1">
                                    <label htmlFor="exampleFormControlInput2" className="form-label">Senha</label>
                                    <div className="input-field">
                                        <input type="password" className="form-control" id="exampleFormControlInput2" placeholder="Digite sua senha" onChange={e => setPassword(e.target.value)} />
                                        <img src="images/pass-eye.svg" alt="" className="pass-eye" />
                                    </div>
                                </div>
                                <div classNameName='form-btn'>
                                    <button className="btn" type='submit'>Entrar</button>
                                </div>

                            </form>
                        </div>
                    </div>
                    <div className="col-md-6 d-none d-md-block">
                        <div className="form-right-part">
                            <div className="image-holder">
                                <figure><img src="images/visa-card-2.png" alt="" /></figure>
                            </div>
                            <div className="inner-text">
                                <p>Bem-vindo ao</p>
                                <p>RappiBank</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}