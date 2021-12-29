// CustomerEdit Component for update data

// Import Modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerForm from './CustomerForm';

// CustomerEdit Component
const CustomerEdit = (props) => {
  const [formValues, setFormValues] = useState({
    name: '',
    address1: '',
    address2: '',
    mailing_district: '',
    mailing_state: '',
  });

  //onSubmit handler
  const onSubmit = (formObject) => {
    axios
      .put(
        'http://localhost:4000/students/update-student/' +
          props.match.params.id,
        formObject
      )
      .then((res) => {
        if (res.status === 200) {
          alert('Successfully updated');
          props.history.push('/customer/list');
        } else Promise.reject();
      })
      .catch((err) => alert('Something went wrong'));
  };

  // Load data from server and reinitialize student form
  useEffect(() => {
    axios
      .get(
        'http://localhost:4000/students/update-student/' + props.match.params.id
      )
      .then((res) => {
        const { name, email, rollno } = res.data;
        setFormValues({ name, email, rollno });
      })
      .catch((err) => console.log(err));
  }, []);

  // Return  form
  return (
    <CustomerForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      Update
    </CustomerForm>
  );
};

// Export Edit Component
export default CustomerEdit;
