import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  Button,
  Card,
  Dropdown,
  Nav,
  Pagination,
  Table,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  deleteShop,
  listShopDetails,
  listShops,
} from '../../actions/shopActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import debounce from 'lodash.debounce';

export const ShopScreen = ({ match, history }) => {
  const [inputValue, setInputValue] = useState('');
  
  const shopList = useSelector((state) => state.shopList);
  const { loading, shopError, shops, pages, page } = shopList;

  let pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  let items = [];

  const paginationClicked = async (e, number) => {
    e.preventDefault();
    pageNumber = number;

    dispatch(listShops(pageNumber));

    history.push(`/shops/page/${number}`);
  };

  useEffect(() => {
    dispatch(listShops(pageNumber, history));
  }, [dispatch, pageNumber]);


  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === page}
        onClick={(event) => paginationClicked(event, number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const pag = (size, gutter, variant, bg, circle) => (
    <Pagination
      size={size}
      className={`mt-4 mb-2 ${gutter ? 'pagination-gutter' : ''} ${
        variant && `pagination-${variant}`
      } ${!bg && 'no-bg'} ${circle && 'pagination-circle'}`}
    >
      {items}
    </Pagination>
  );

  const deleteshopHandler = async (id) => {
    let formdata = new FormData();
    formdata.set('id', id);
    if (window.confirm('Are you sure')) {
      dispatch(deleteShop(formdata));
    }
  };

  const debouncedSave = useCallback(
    debounce((newValue) => dispatch(listShops(1, history, newValue)), 1000),
    []
  );

  const updateValue = (newValue) => {
    setInputValue(newValue);
    debouncedSave(newValue);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : shopError ? (
        <Message variant="danger">{shopError}</Message>
      ) : (
        <div>
          <div className="d-flex justify-content-between my-4">
            <div className="d-flex w-50">
              <input
                className="form-control shadow-none rounded mx-2"
                placeholder="Search Shops"
                onChange={(input) => updateValue(input.target.value)}
                value={inputValue}
                autoFocus
              />
            </div>
            <div>
              <Link to="/shops/createshop">
                <Button variant="secondary mb-2">Add New Shop</Button>
              </Link>
            </div>
          </div>

          <Card>
            <Card.Body>
              <Table responsive className="header-border ">
                <thead>
                  <tr>
                    <th> Shop Id</th>
                    <th> Shop Name</th>
                    <th> Image</th>
                    <th> Shop TRN</th>
                  </tr>
                </thead>
                <tbody>
                  {shops &&
                    shops.map((item, index) => (
                      <tr key={index}>
                        <td
                          style={{
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            history.push(`/shops/createshop/${item.id}`);
                          }}
                        >
                          {item.id}
                        </td>
                        <td
                          style={{
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            history.push(`/shops/createshop/${item.id}`);
                          }}
                        >
                          {item.shop_name}
                        </td>
                        <td
                          style={{
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            history.push(`/shops/createshop/${item.id}`);
                          }}
                        >
                          <Card.Img
                            style={{
                              height: '80px',
                              width: '80px',
                              objectFit: 'contain',
                            }}
                            src={
                              'https://www.khaymatapi.mvp-apps.ae/storage/' +
                              item.shop_coverImage
                            }
                            variant="top"
                          />
                        </td>
                        <td
                          style={{
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            history.push(`/shops/createshop/${item.id}`);
                          }}
                        >
                          {item.shop_trn}
                        </td>

                        <td>
                          <div className="d-flex justify-content-around">
                            <i
                              className="fa fa-trash"
                              style={{
                                cursor: 'pointer',
                                color: 'red',
                              }}
                              onClick={() => deleteshopHandler(item.id)}
                            ></i>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <Nav>{pag('', true, 'danger', true, false)}</Nav>
        </div>
      )}
    </>
  );
};
