import React from 'react';
import './css/SignUp.css'
import {Link, useLocation} from "react-router-dom";
import useLoginForm from '../../hooks/useLoginForm';
const LogIn = () => {

    const { formData, isButtonDisabled, handleChange, handleSubmit } = useLoginForm();

    
  
   

    return (
        <section className="card">
            <h2 className="login">Ingresar</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <button type="submit" disabled={isButtonDisabled}>Ingresar</button>
                </div>
            </form>
            <div>
                <div className="line"></div>
                <div className="question-acount">
                    <p>¿Todavía no tienes cuenta? <Link style={{color: '#286CFF', textDecoration: 'none'}} to={"/signup"}>Regístrate</Link></p>
                </div>
            </div>
        </section>
    );
};

export default LogIn;
