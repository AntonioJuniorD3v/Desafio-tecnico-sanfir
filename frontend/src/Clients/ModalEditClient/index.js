import React, { useState } from 'react';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Edit } from '@material-ui/icons';
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

import * as yup from 'yup';
import { setLocale } from 'yup';

import api from '../../services/api';

import { format } from 'date-fns';

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

export default function ModalEditClient({ client, getClients }) {
  const [loading, setLoading] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email);
  const [dateOfBirth, setDateOfBirth] = useState(
    format(new Date(client.date_of_birth), 'yyyy-MM-dd')
  );
  const [city, setCity] = useState(client.city);
  const [uf, setUf] = useState(client.uf);

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

      try {
        await api.put('clients', {
          id: client.id,
          name,
          email,
          date_of_birth: dateOfBirth,
          city,
          uf,
        });

        handleClose();
        getClients();
      } catch (err) {
        alert('Ocorreu um erro ao tentar atualizar os dados do cliente.');
      }

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
      <Edit onClick={handleClickOpen} style={{ cursor: 'pointer' }} />

      <Dialog open={open} aria-labelledby='form-dialog-title'>
        <form onSubmit={handleSubmit}>
          <DialogTitle
            id='form-dialog-title'
            onClose={() => {
              setOpen(!open);
            }}
          >
            Atualizar dados
          </DialogTitle>
          <DialogContent
            style={{ display: 'flex', flexDirection: 'column', width: '500px' }}
          >
            <TextField
              margin='dense'
              id='name'
              defaultValue={name}
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
              defaultValue={email}
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
              onChange={(e) => {
                setDateOfBirth(e.target.value);
              }}
              defaultValue={dateOfBirth}
              variant='outlined'
              margin='dense'
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin='dense'
              id='city'
              defaultValue={city}
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
