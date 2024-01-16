import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Image, Alert } from 'antd';
import { disponibilidadStock } from '../../Utilities/Utilities';
import { Descriptions } from 'antd';
import './css/DetailProduct.css';
import axios from 'axios';


const DetailProduct = () => {
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [error, setError] = useState(null);

    const getProductById = async (id) => {
        try {
            const resp = await axios.get(`/Api/product/getProductById/${id}`);
            const product = await resp.data;
            return product.data[0];
        } catch (error) {
            setError(error.response ? error.response.data.msg : 'Error desconocido');
            throw error; 
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const details = await getProductById(id);
                setProductDetails(details);
            } catch (error) {
                console.error( error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <>
            <section className="section-detail">
                {productDetails ? (
                    <>
                        <div>
                            <h1>{productDetails.vnombre}</h1>
                        </div>
                        <figure>
                            <Image width={600} height={400} src={productDetails.vpath} />
                        </figure>
                        <div style={{ marginLeft: '150px' }}>
                            <Descriptions title="Descripcion" column={1}>
                                <Descriptions.Item label="Descripción">
                                    {productDetails.tdescripcion}
                                </Descriptions.Item>
                            </Descriptions>
                            <Descriptions title="Detalles" column={4}>
                                <Descriptions.Item label="Marca">{productDetails.vmarca}</Descriptions.Item>
                                <Descriptions.Item label="Categoría">{productDetails.vcategoria}</Descriptions.Item>
                                <Descriptions.Item label="Precio">${productDetails.fpreciooferta}</Descriptions.Item>
                                <Descriptions.Item label="Stock">{disponibilidadStock(productDetails.ncantidad)}</Descriptions.Item>
                            </Descriptions>
                            {productDetails.bofertavalida === 1 && (
                                <Descriptions title="Oferta" column={1}>
                                    <Descriptions.Item label="Oferta Hasta">
                                        {productDetails.dofertahasta}
                                    </Descriptions.Item>
                                </Descriptions>
                            )}
                        </div>
                    </>
                ) : (
                    <Alert
                        message="Error"
                        description={error}
                        type="error"
                        closable
                        />
                )}
            </section>
        </>
    );
};

export default DetailProduct;
