import React, { useMemo, useState, useEffect } from 'react';
import { Container, Row, Col, Button, Checkbox, Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAxios } from 'use-axios-client';
import Moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const InvoiceList = (props) => {
  // ***** setting variable
  const baseURL = 'https://61cc1f01198df60017aebeda.mockapi.io/invoice';
  const [pending, setPending] = useState(true);
  const [data, setDatas] = useState([]);

  // ***** setting DataTable Colums
  const columns = [
    // {
    //   name: 'Id',
    //   selector: (row) => row.id,
    //   sortable: true,
    // },
    {
      name: 'Name',
      selector: (row) => row.iname,
      sortable: true,
    },
    {
      name: 'State',
      selector: (row) => row.istate,
      sortable: true,
    },

    {
      name: 'Total',
      selector: (row) =>row.itotal,
      sortable: true,
    },
    {
      name: 'Due',
      selector: (row) => Moment(row.idueAt).format('D/MM/YYYY'),
      sortable: true,
    },
    {
      name: 'Action',
      button: true,
      cell: (row) => (
        <>
          <Link to={'/invoice/' + row.id} className="btn btn-info btn-sm">
            Edit
          </Link>
          <button
            onClick={() => deleteSubmit(row.id)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </>
      ),
    },
  ];
  // *****  setting DataTable Expanded Component
  const ExpandedComponent = ({ data }) => (
    <div className="cointainer">
      <div className="row">
        <div clasName="col-4">
          Updated : {Moment(data.dcreatedAt).format('D/MM/YYYY')}
        </div>
        <div clasName="col-4"></div>
        <div clasName="col-4">{JSON.stringify(data, null, 2)}</div>
      </div>

      {/* {JSON.stringify(data, null, 2)} */}
    </div>
  );
  // ***** setting row delete action
  const deleteSubmit = (deleteID) => {
    confirmAlert({
      title: 'Confirm to Delete ',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            setPending(true);
            axios
              .delete(baseURL + '/' + deleteID)
              .then((res) => {
                if (res.status === 200) {
                  // alert('Successfully Delete');

                  LoadData();
                  // props.history.push('/state/list');
                } else Promise.reject();
              })
              .catch((err) => alert('Something went wrong'));
          },
        },
        {
          label: 'No',
          onClick: () => {
            // alert('Click Yes');
          },
        },
      ],
    });
  };
  // ***** setting LoadData after delete
  const LoadData = () => {
    axios
      .get(baseURL)
      .then((response) => {
        // console.log(response.data);
        setDatas(response.data);
        setPending(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // ***** setting data using axios
  useEffect(() => {
    async function getData() {
      await axios
        .get(baseURL)
        .then((response) => {
          // console.log(response.data);
          setDatas(response.data);
          setPending(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (data) {
      getData();
    }
  }, []);

  // ***** return
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-8">
          <h2>District List</h2>
        </div>
        <div className="col" align="right">
          <Link to={'/districtcreate'} className="btn btn-primary btn-sm">
            New Record
          </Link>
        </div>
      </div>
      <div className="row justify-content-md-center">
        <div className="col">
          <DataTable
            columns={columns}
            data={data}
            defaultSortField="id"
            defaultSortAsc={true}
            pagination
            highlightOnHover
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            progressPending={pending}
            // dense
          />
        </div>
      </div>
    </div>
  );
};
export default InvoiceList;
