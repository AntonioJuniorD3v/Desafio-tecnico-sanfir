import React, { useState, useEffect } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

import { format } from 'date-fns';

import api from '../services/api';

import ModalAddClient from './ModalAddClient';
import ModalDeleteClient from './ModalDeleteClient';
import ModalEditClient from './ModalEditClient';

import { Container, ButtonsActions } from './styles';

export default function Clients() {
  const [clients, setClients] = useState([]);

  async function getClients() {
    try {
      const response = await api.get('clients');
      setClients(response.data);
    } catch (err) {
      alert('Ocorreu um erro ao buscar os dados.');
    }
  }

  useEffect(() => {
    getClients();
  }, []);

  return (
    <Container>
      <div id='container-coupon-restaurant'>
        <Box p={2}>
          <div id='container-filter-button-modal'>
            <ModalAddClient getClients={getClients} />
          </div>

          <TableContainer component={Paper}>
            <Table className={'classes.table'} aria-label='simple table'>
              <TableHead>
                <TableRow style={{ textAlignLast: 'center' }}>
                  <TableCell>ID</TableCell>
                  <TableCell align='right'>Nome</TableCell>
                  <TableCell align='right'>E-mail</TableCell>
                  <TableCell align='right'>Data de nascimento</TableCell>
                  <TableCell align='right'>Cidade</TableCell>
                  <TableCell align='right'>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.map((client) => (
                  <TableRow
                    key={'row.name'}
                    style={{ textAlignLast: 'center' }}
                  >
                    <TableCell component='th' scope='row'>
                      {client.id}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {client.name}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {client.email}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {format(new Date(client.date_of_birth), 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {client.city} - {client.uf}
                    </TableCell>
                    <TableCell align='right'>
                      <ButtonsActions>
                        <ModalEditClient
                          client={client}
                          getClients={getClients}
                        />
                        <ModalDeleteClient
                          id={client.id}
                          getData={getClients}
                        />
                      </ButtonsActions>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </Container>
  );
}
