import { Button, Modal, Spin } from "antd";

const Confirm = ({ title, isModalVisible, handleOk, handleCancel, data, isSpinning }) => {
  return (
    <>
      <Modal
        title={!isSpinning ? title : null}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={isSpinning ? null : (
            <>
              <Button key="cancel" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button key="confirmar" type="primary" onClick={handleOk}>
                Confirmar
              </Button>
            </>
          )}
        okText='Confirmar'             
      >
        {isSpinning ? (
            <div  style={{ height: '200px', padding: '100px', }}>
                <Spin tip="Cargando Orden" size="large">
                    <div className="content" />
                </Spin>

            </div>
        ) : (
         
          <>
            {data && (
              <div style={{ marginTop: '10px' }}>
                <ul className='cart-precio-final'>
                  {data.envio && <li>Envío: $6000</li>}
                  <li>Total de Productos: $ {data.precioTotal}</li>
                  {data.envio && <li>Precio Final con Envío: $ {data.precioTotal + 6000}</li>}
                  {!data.envio && <li>Precio Final: $ {data.precioTotal}</li>}
                </ul>
              </div>
            )}
          </>
        )}
      </Modal>
    </>
  );
};

export default Confirm;
