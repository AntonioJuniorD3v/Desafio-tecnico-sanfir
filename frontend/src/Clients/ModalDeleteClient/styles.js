import styled from 'styled-components';

export const Container = styled.div`

  button {
    display: flex;
    align-items: center;
    text-align: center;

    background: #c72828;

    border-style: none;
    border-radius: 5px;

    padding: 10px;
    height: 40px;

    color: #fff;
    font-weight: bold;
  }

  #container-filter button svg {
    margin-right: 5px;
  }

  .btn-save {
    background: #4CAF50 !important;
    color: #fff !important;
  }


  .btn-cancel {
    background: #f44336 !important;
    color: #fff !important;
  }

`;
