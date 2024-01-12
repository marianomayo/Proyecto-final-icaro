import React from 'react';
import './css/SignUp.css'
import {Link} from "react-router-dom";
const LogIn = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
      
    };

    return (
        <section className="card">
            <h2 className="login">Ingresar</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required placeholder="Email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" name="password" required placeholder="Contraseña" />
                </div>

                <div className="form-group">
                    <button type="submit">Ingresar</button>
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
