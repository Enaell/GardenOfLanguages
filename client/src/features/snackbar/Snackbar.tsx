import React from 'react';
import { Snackbar as MuiSnackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks';
import { closeSnackbar, snackbarState } from '../../app/redux/snackbarSlice';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Snackbar() {
  const classes = useStyles();

  const { open, severity, message } = useAppSelector(snackbarState)
  const dispatch = useAppDispatch();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeSnackbar());
  };

  return (
    <div className={classes.root}>
      <MuiSnackbar open={open} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          { message }
        </Alert>
      </MuiSnackbar>
    </div>
  );
}