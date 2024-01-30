// useLoginForm.js
import { useState } from 'react';
import axios from 'axios';
import { useUserStore } from '../Store/useUserStore';
import {errorModal, confirmMessage} from '../Utilities/Utilities';
import { useNavigate } from 'react-router-dom';

const useLoginForm = () => {

    const navigate = useNavigate();
    const login = useUserStore((state) => state.login);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
        isFormValid();
    };

    const isFormValid = () => {
        const requiredFields = ['email', 'password'];

        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

        return requiredFields.every(field => formData[field].trim() !== '') &&  isValidEmail;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await logIn(formData);

            if(response.status === 200){

                
            
                const userObj = await response.data;       
        
                formData.userId = userObj.sessionData.userId;
                formData.administrador = userObj.sessionData.administrador;
                formData.vfullname = userObj.sessionData.vfullname;
                formData.nombre = userObj.sessionData.nombre;
                formData.apellido = userObj.sessionData.apellido;
                formData.direccion = userObj.sessionData.direccion;
                formData.numero = userObj.sessionData.numero;
                formData.depto = userObj.sessionData.depto;
                formData.email = userObj.sessionData.email;
                const modal = confirmMessage(`Hola ${userObj.sessionData.vfullname} !!`);
        
            
                
                await new Promise(resolve => {
                    setTimeout(() => {
                        modal.destroy();

                        resolve();
                    }, 2000);
                });

                saveState(formData);
                navigate("/");
    
            }else{
            
                throw response;
            }
        } catch (error) {
        
            console.error('Error al registrar:',error.response.data.msg );  
            errorModal(error.response.data.msg);
        }
    };

    const logIn = async (formData) => {    
        const response = await axios.post('/Api/user/logIn', formData);      
        return response;

    };

        const saveState = (formData) => {
            login(formData);
            setFormData({
                email: '',
                password: '',
            });
        }

    return {
        formData,
        isFormValid,
        handleChange,
        handleSubmit,
    };
};

export default useLoginForm;
