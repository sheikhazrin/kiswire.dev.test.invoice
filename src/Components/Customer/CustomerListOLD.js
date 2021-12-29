import React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Table,
} from 'react-bootstrap';
function CustomerList() {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col>
          <h2>Customer List</h2>
        </Col>
        <Col align="right">
          <Button variant="outline-primary">New</Button>{' '}
        </Col>
      </Row>
      <Row>
        <Table responsive="md">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Address</th>
              <th>District</th>
              <th>State</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>
                <ButtonGroup aria-label="Basic example">
                  <Button variant="outline-primary" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline-danger">Del</Button>
                </ButtonGroup>{' '}
              </td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default CustomerList;
