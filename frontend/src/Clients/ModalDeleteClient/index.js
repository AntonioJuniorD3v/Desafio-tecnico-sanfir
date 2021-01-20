import React, { useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Delete } from '@material-ui/icons';

import api from '../../services/api';

import { Container } from './styles';

export default function DeleteComponent({ id, getData }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();

    try {
      await api.delete(`clients/${id}`);

      handleClose();
      setLoading(false);
      getData();
    } catch (err) {
      alert('Ocorreu um erro ao tentar deletar os dados do cliente.');
    }
  }

  return (
    <>
      <Delete onClick={handleClickOpen} style={{ cursor: 'pointer' }} />
      <Container>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='form-dialog-title'
        >
          <form onSubmit={handleSubmit}>
            <DialogTitle id='form-dialog-title'>
              Tem certeza que deseja apagar?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                Essa alteração NÃO poderá ser revertida!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant='contained'
                onClick={handleClose}
                className='btn-cancel'
              >
                Não
              </Button>
              <Button
                variant='contained'
                color='secondary'
                disabled={loading}
                type='submit'
              >
                {loading ? 'Excluindo...' : 'Sim'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
    </>
  );
}
