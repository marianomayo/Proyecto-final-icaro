import React, { useState } from 'react';
import './css/SignUp.css'
import useSignUpForm from '../../hooks/useSignUpForm'; 
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';

const SignUp = () => {
   
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const { formData, handleChange, isFormValid, handleSubmit } = useSignUpForm();

    return (
        <section className="card">
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input   type="text"
                        id="nombre"
                        name="nombre"
                        required
                        placeholder="Nombre"
                        maxLength={150}
                        value={formData.nombre}
                        onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="apellido">Apellido:</label>
                    <input   type="text"
                        id="apellido"
                        name="apellido"
                        required
                        placeholder="apellido"
                        maxLength={150}
                        value={formData.apellido}
                        onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="nacimiento">Fecha de Nacimiento:</label>
                    <input  type="date"
                        id="nacimiento"
                        name="nacimiento"
                        required
                        value={formData.nacimiento}
                        onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="direccion">Dirección:</label>
                    <input type="text"
                        id="direccion"
                        name="direccion"
                        required
                        maxLength={100}
                        placeholder="direccion"
                        value={formData.direccion}
                        onChange={handleChange}  />
                </div>
                <div className="form-group">
                    <label htmlFor="numero">Número:</label>
                    <input  type="number"
                        id="numero"
                        name="numero"
                        required
                        maxLength={50}
                        placeholder="numero"
                        value={formData.numero}
                        onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="depto">Depto:</label>
                    <input type="text"
                        id="depto"
                        name="depto"   
                        maxLength={45}                     
                        placeholder="depto"
                        value={formData.depto}
                        onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email"
                        id="email"
                        name="email"
                        required
                        maxLength={150}
                        placeholder="email"
                        value={formData.email}
                        onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password"
                        id="password"
                        name="password"
                        required
                        maxLength={50}
                        placeholder="password"
                        value={formData.password}
                        onChange={handleChange} />
                </div>
                <div className="form-group">
                    <button type="submit" disabled={!isFormValid()}>Registrarse</button>
                </div>
            </form>
        </section>
    );
};

export default SignUp;
