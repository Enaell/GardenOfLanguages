import React from 'react';
import { Fade } from '@material-ui/core';
import { Row } from '../../features/common/Flexbox';
import { UserBoard } from '../../features/userboard/UserBoard';
import { userApi } from '../apiClient/userApi';

export const UserPage = () => {
  
  return (
      <Row horizontal='center' width='100%' style={{marginTop:'50px'}}>
        <UserBoard />
      </Row>
  )

}