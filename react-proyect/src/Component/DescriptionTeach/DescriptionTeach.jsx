import React from 'react';
import { Descriptions } from 'antd';


const DescriptionTeach = ({title, itemsEnviados, column}) => {    
    
    const items = [              
       
        {
            key: '1',
            label: 'Email',
            children: 'Info@teachecommerce.com.ar',
        },       
        {
            key: '2',
            label: 'CBU',
            children: '0000025124516325659',
        },
        {
            key: '3',
            label: 'Dirección',
            children: 'Rodriguez 11 Tandil, Bs. As, Arg',
        },
        {
            key: '4',
            label: 'Banco',
            children: 'Credicoop',
        },
       
    ];
    return (

        <>
            <Descriptions title="Datos de la Empresa" items={items} column={2}/>
        </>

     )
}


export default DescriptionTeach;