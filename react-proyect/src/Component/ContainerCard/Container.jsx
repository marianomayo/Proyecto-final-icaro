import React from 'react';
import { Flex } from 'antd';
const ContainerCard = ({ children }) => {
  return (
    <>
        <Flex wrap="wrap" gap="small">
            {children}
        </Flex>
    </>
   
   
  );
}

export default ContainerCard;