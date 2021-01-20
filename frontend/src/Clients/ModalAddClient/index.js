import React, { useState } from 'react';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Add } from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';

import api from '../../services/api';

import * as yup from 'yup';
import { setLocale } from 'yup';

import { ButtonAddClient } from './styles';

setLocale({
  string: {
    email: 'Insira um email válido',
  },
});

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export default function ModalAddCoupon({ getClients }) {
  const [loading, setLoading] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [city, setCity] = useState();
  const [uf, setUf] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const data = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      dateOfBirth: yup.date().default(() => new Date().required()),
      city: yup.string().required(),
      uf: yup.string().required(),
    });

    try {
      await data.validate({
        name,
        email,
        dateOfBirth,
        city,
        uf,
      });

      await api.post('clients', {
        name,
        email,
        date_of_birth: dateOfBirth,
        city,
        uf,
      });

      handleClose();
      getClients();
    } catch (e) {
      e.errors.map((error) => {
        alert(error);
      });
    }

    setLoading(false);
  }

  return (
    <>
      <ButtonAddClient onClick={handleClickOpen}>
        <Add /> Adicionar cliente
      </ButtonAddClient>
      <Dialog open={open} aria-labelledby='form-dialog-title'>
        <form onSubmit={handleSubmit}>
          <DialogTitle
            id='form-dialog-title'
            onClose={() => {
              setOpen(!open);
            }}
          >
            Adicionar novo cliente
          </DialogTitle>
          <DialogContent
            style={{ display: 'flex', flexDirection: 'column', width: '500px' }}
          >
            <TextField
              margin='dense'
              id='name'
              required
              label='Nome Completo'
              onChange={(e) => {
                setName(e.target.value);
              }}
              variant='outlined'
            />

            <TextField
              margin='dense'
              id='email'
              type='email'
              required
              label='E-mail'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              variant='outlined'
            />
            <TextField
              id='dateOfBirth'
              label='Data de aniversário'
              type='date'
              placeholder='dd/MM/yyyy'
              required
              for
              variant='outlined'
              margin='dense'
              onChange={(e) => {
                setDateOfBirth(e.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin='dense'
              id='city'
              required
              label='Cidade'
              onChange={(e) => {
                setCity(e.target.value);
              }}
              variant='outlined'
            />
            <FormControl
              variant='outlined'
              size='small'
              style={{ width: '100%', marginTop: '10px' }}
            >
              <InputLabel>Estado</InputLabel>
              <Select
                value={uf}
                onChange={(e) => {
                  setUf(e.target.value);
                }}
                required
                labelId='Estado'
                label='Estado'
              >
                <MenuItem value='AC'>Acre</MenuItem>
                <MenuItem value='AL'>Alagoas</MenuItem>
                <MenuItem value='AP'>Amapá</MenuItem>
                <MenuItem value='AM'>Amazonas</MenuItem>
                <MenuItem value='BA'>Bahia</MenuItem>
                <MenuItem value='CE'>Ceará</MenuItem>
                <MenuItem value='DF'>Distrito Federal</MenuItem>
                <MenuItem value='ES'>Espírito Santo</MenuItem>
                <MenuItem value='GO'>Goiás</MenuItem>
                <MenuItem value='MA'>Maranhão</MenuItem>
                <MenuItem value='MT'>Mato Grosso</MenuItem>
                <MenuItem value='MS'>Mato Grosso do Sul</MenuItem>
                <MenuItem value='MG'>Minas Gerais</MenuItem>
                <MenuItem value='PA'>Pará</MenuItem>
                <MenuItem value='PB'>Paraíba</MenuItem>
                <MenuItem value='PR'>Paraná</MenuItem>
                <MenuItem value='PE'>Pernambuco</MenuItem>
                <MenuItem value='PI'>Piauí</MenuItem>
                <MenuItem value='RJ'>Rio de Janeiro</MenuItem>
                <MenuItem value='RN'>Rio Grande do Norte</MenuItem>
                <MenuItem value='RS'>Rio Grande do Sul</MenuItem>
                <MenuItem value='RO'>Rondônia</MenuItem>
                <MenuItem value='RR'>Roraima</MenuItem>
                <MenuItem value='SC'>Santa Catarina</MenuItem>
                <MenuItem value='SP'>São Paulo</MenuItem>
                <MenuItem value='SE'>Sergipe</MenuItem>
                <MenuItem value='TO'>Tocantins</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              variant='contained'
              color='primary'
              disabled={loading}
              type='submit'
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
