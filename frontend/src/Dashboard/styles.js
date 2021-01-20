import styled from 'styled-components';

export const Container = styled.div`
  .container-boxes {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 0px 10px !important;
  }

  .box-home {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    justify-content: flex-start;
    align-items: center;

    padding: 10px;
    margin: 10px;

    background: #fff;

    border-radius: 5px;
    box-shadow: 0.2px 0.5px 3px gray;
  }

  .box-home-icon {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 10px;
    border-radius: 4px;

    text-align: center;

    width: 50px;
    height: 50px;

    margin-right: 10px;
    color: #fff;
  }

  .box-home-content {
    display: flex;
    flex-direction: column;
  }

  .box-home-content span {
    margin-bottom: 4px;
    font-size: 14px;
  }

  .box-home-content strong {
    font-size: 25px;
    text-align-last: left;
  }

  #container-table {
    max-width: 900px;
    padding: 10px;
  }

  #container-table div {
    display: flex;
    align-items: center;
    justify-content: center;

    color: #979797;
    margin: 10px 0;
  }

  #container-table div span {
    margin-left: 5px;
  }
`;

export const BoxCities = styled.div`
  justify-content: start;
  /* background-color: #ffffff; */
  border-radius: 10px;
  padding: 10px;
  text-align: initial;
  margin: 0 20px;

  li {
    font-size: 16px;
  }
`;
