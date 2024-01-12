import React, { useEffect, useState } from 'react';
import axios from 'axios';
export const useCategory = () => {
    const [categorias, setCategoria] = useState([]);
    
    
    useEffect(() => {
        loadCategory();
    }, [])
    
    const loadCategory = async () => {
        const resp = await axios.get('/Api/category')
        const category = await resp.data;
        setCategoria(category.data)
    }
   
    return {
        categorias      
    }
}

