import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;

  #container-coupon-restaurant {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-content: baseline;

    /* overflow: auto; */
  }

  #container-filter-button-modal {
    margin-bottom: 10px;
  }

  #menu-main {
    width: 100%;
    padding: 10px;
  }

  .category {
    width: 100%;
    height: 100%;

    background: #fff;

    border-radius: 5px;
    border: 1px solid #c72828;
    box-shadow: 0.2px 0.3px 3px gray;
  }

  .category-name {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 10px 20px;

    background: #c72828;

    border-bottom: 1px solid #f2f2f2;
    margin-bottom: 10px;
  }

  .category-name > span {
    font-size: 24px;
    font-weight: 500;

    color: #fff;
  }

  .category-name div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    color: #fff;
  }

  .category-name div svg {
    margin-left: 10px;
  }

  .category-product {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0px 0;

    padding: 10px 20px;

    border-bottom: 1px solid #f2f2f2;
  }

  .category-product .category-product-actions {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    color: grey;
  }

  .category-product-actions > svg {
    margin-left: 10px;
  }

  .category-product-description {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .category-product-description div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    color: #3e3e3e;

    margin-left: 20px;
  }

  .category-product-description div span {
    font-size: 12px;
    color: #979797;
    margin-top: 3px;
  }

  .product-price {
    color: #3e3e3e;
  }
`;

export const ButtonsActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  color: #979797;

  svg {
    margin-left: 5px;
  }
`;

export const TextStatusCoupon = styled.span`
  padding: 2px 10px;
  background: red;
  border-radius: 100px;
  color: #fff;

  ${(props) =>
    props.status &&
    css`
      background: green;
    `}
`;
