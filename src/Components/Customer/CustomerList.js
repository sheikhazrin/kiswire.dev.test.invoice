import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
// import CustomerTableRow from './CustomerTableRow';

const CustomerList = () => {
  const APILink =
    'https://61c4403ef1af4a0017d99432.mockapi.io/api/kiswire/dev/customer';

  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    axios
      .get(APILink)
      .then((response) => {
        setAPIData(response.data);
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const setData = (data) => {
    let { id, name, address1, address2, mailing_district, mailing_state } =
      data;
    localStorage.setItem('ID', id);
    localStorage.setItem('Name', name);
    localStorage.setItem('Address1', address1);
    localStorage.setItem('Address2', address2);
    localStorage.setItem('District', mailing_district);
    localStorage.setItem('State', mailing_state);
  };

  const getData = () => {
    axios.get(APILink).then((response) => {
      setAPIData(response.data);
    });
  };

  const onDelete = (id) => {
    axios.delete(APILink + '/' + id).then(() => {
      getData();
    });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col>
          <h2>Customer List</h2>
        </Col>
        <Col align="right">
          <Link to={'/customer/new'}>
            <Button variant="outline-primary">New</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Table responsive="md">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>District</th>
              <th>State</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {APIData.map((data, i) => {
              return (
                <tr>
                  <td>{data.name}</td>
                  <td>
                    {data.address1}
                    <br />
                    {data.address2}{' '}
                  </td>
                  <td>{data.mailing_district}</td>
                  <td>{data.mailing_state}</td>
                  <td>
                    <Link to={'/customer/' + data.id}>
                      <Button title="View" variant="outline-primary" size="sm">
                        =
                      </Button>
                    </Link>{' '}
                    {/* <Button onClick={onDelete(data.id)}>Delete</Button> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default CustomerList;
