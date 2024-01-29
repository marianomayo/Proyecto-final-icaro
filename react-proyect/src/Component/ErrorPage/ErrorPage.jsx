import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = ({status, message}) => {
  return (
    <div style={{ textAlign: 'center' }}>
       <Result
    status={status}
    title={status}
    subTitle={message}
    extra={<Link to={'/'}><Button type="primary">Volver</Button></Link>}
  />
    </div>
  );
};

export default ErrorPage;
