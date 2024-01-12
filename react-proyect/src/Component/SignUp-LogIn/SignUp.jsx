import React from 'react';
import './css/SignUp.css'

const SignUp = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Agrega lógica de manejo de datos del formulario aquí
    };

    return (
        <section className="card">
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" required placeholder="Nombre" />
                </div>
                <div className="form-group">
                    <label htmlFor="apellido">Apellido:</label>
                    <input type="text" id="apellido" name="apellido" required placeholder="Apellido" />
                </div>
                <div className="form-group">
                    <label htmlFor="nacimiento">Fecha de Nacimiento:</label>
                    <input type="date" id="nacimiento" name="nacimiento" required />
                </div>
                <div className="form-group">
                    <label htmlFor="direccion">Dirección:</label>
                    <input type="text" id="direccion" name="direccion" placeholder="Dirección" required />
                </div>
                <div className="form-group">
                    <label htmlFor="numero">Número:</label>
                    <input type="text" id="numero" name="numero" placeholder="Número" required />
                </div>
                <div className="form-group">
                    <label htmlFor="depto">Depto:</label>
                    <input type="text" id="depto" name="depto" placeholder="Depto" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" name="password" placeholder="Contraseña" required />
                </div>
                <div className="form-group">
                    <button type="submit">Registrarse</button>
                </div>
            </form>
        </section>
    );
};

export default SignUp;
