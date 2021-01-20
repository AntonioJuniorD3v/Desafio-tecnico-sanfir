import React, { useState, useEffect } from 'react';

import { BarChart, PermContactCalendar, People } from '@material-ui/icons';

import { differenceInYears } from 'date-fns';

import { Container, BoxCities } from './styles.js';

import api from '../services/api';

function Dashboard() {
  const [clients, setClients] = useState([]);
  const [cities, setCities] = useState([]);

  const [younger, setYounger] = useState(0);
  const [older, setOlder] = useState(0);
  const [average, setAverage] = useState(0);

  async function getClients() {
    try {
      const response = await api.get('clients');
      setClients(response.data);
      getCities(response.data);
      calculateAges(response.data);
    } catch (err) {
      alert('Ocorreu um erro ao buscar os dados.');
    }
  }

  function calculateAges(data) {
    let youngerAge = 150;
    let olderAge = 0;
    let averageAge = 0;

    data.forEach((client) => {
      const age = differenceInYears(new Date(), new Date(client.date_of_birth));

      if (age < youngerAge) {
        youngerAge = age;
      }
      if (age > olderAge) {
        olderAge = age;
      }

      averageAge += age;
    });

    averageAge = averageAge / data.length;

    setYounger(youngerAge);
    setOlder(olderAge);
    setAverage(averageAge);
  }

  function getCities(data) {
    var cities = data.map(function (client) {
      return client.city + ' - ' + client.uf;
    });

    cities = new Set(cities);
    setCities([...cities]);
  }

  useEffect(() => {
    getClients();
  }, []);

  return (
    <Container>
      <div className='container-boxes'>
        <div className='box-home'>
          <div className='box-home-icon' style={{ background: '#9a0036' }}>
            <People />
          </div>
          <div className='box-home-content'>
            <span>Total de pessoas cadastradas</span>
            <strong>{clients.length}</strong>
          </div>
        </div>

        <div className='box-home'>
          <div className='box-home-icon' style={{ background: '#2196f3' }}>
            <PermContactCalendar />
          </div>
          <div className='box-home-content'>
            <span>Menor idade entre as pessoas cadastradas</span>
            <strong>{younger} anos</strong>
          </div>
        </div>
      </div>

      <div className='container-boxes'>
        <div className='box-home'>
          <div className='box-home-icon' style={{ background: '#f44336' }}>
            <PermContactCalendar />
          </div>
          <div className='box-home-content'>
            <span>Maior idade entre as pessoas cadastradas</span>
            <strong>{older} anos</strong>
          </div>
        </div>
        <div className='box-home'>
          <div className='box-home-icon' style={{ background: '#009688' }}>
            <BarChart />
          </div>
          <div className='box-home-content'>
            <span>Média de idade entre as pessoas cadastradas</span>
            <strong>{average.toFixed(1)} anos</strong>
          </div>
        </div>
      </div>

      <BoxCities>
        <h1>Cidades cadastradas:</h1>
        <ol>
          {cities.map((city) => {
            return <li>{city}</li>;
          })}
        </ol>
      </BoxCities>
    </Container>
  );
}

export default Dashboard;
