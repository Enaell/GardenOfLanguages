import React from 'react';
import {Dialog, DialogContent} from '@material-ui/core';
import { LoginTabs } from './LoginTabs'; 
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks';
import { connectionState, toggleModal } from '../../app/redux/connectionSlice';


export const LoginModal = () => {

  const { open } = useAppSelector(connectionState)
  const dispatch = useAppDispatch();

  return (
    <div>
      <Dialog open={open} onClose={() => dispatch(toggleModal(false))} aria-labelledby="form-dialog-title">
        <form>
          <DialogContent>
            <LoginTabs visitorOption={false} orientation='horizontal'/>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
