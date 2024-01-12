import React, { useEffect, useState } from 'react';
import axios from 'axios';
export const useMarca = () => {
    const [marcas, setMarca] = useState([]);
    
    
    useEffect(() => {
        loadBrands()
    }, [])
    
    const loadBrands = async () => {
        const resp = await axios.get('/Api/brand/getBrands')
        const marca = await resp.data;      
        setMarca(marca.data)
    }
   
    return {
        marcas      
    }
}

