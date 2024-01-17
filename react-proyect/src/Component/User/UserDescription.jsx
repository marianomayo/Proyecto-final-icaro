import React from 'react';
import { Descriptions } from 'antd';
import { useUserStore } from '../../Store/useUserStore';





const UserDescription = () => {
   
    const usuario = useUserStore((s) => s.usuario);
    
    const items = [               
        {
            key: '1',
            label: 'Nombre completo',
            children: usuario.vfullname,
        },
        {
            key: '2',
            label: 'Email',
            children: usuario.email,
        },       
        {
            key: '3',
            label: 'Dirección y Número',
            children: (
                <>
                    <div>{usuario.direccion} - {usuario.numero} {usuario.depto ? ` - Depto: ${usuario.depto}` : ''}</div>                    
                </>
            ),
        },
    ];
    return (

        <>
            <Descriptions title="Informacion usuario" items={items} column={1}/>
        </>

     )
}


export default UserDescription;