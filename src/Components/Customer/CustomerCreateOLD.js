// Import Modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerForm from './CustomerForm';
import { useHistory } from 'react-router';

// Create Component
const CreateCustomer = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    address1: '',
    address2: '',
    mailing_district: '',
    mailing_state: '',
  });

  const APILink =
    'https://61c4403ef1af4a0017d99432.mockapi.io/api/kiswire/dev/customer';
  // onSubmit handler
  const onSubmit = (submitObject) => {
    axios
      .post(APILink, submitObject)
      .then((res) => {
        if (res.status === 200) alert('Successfully created');
        else Promise.reject();
      })
      .catch((err) => alert('Something went wrong'));
  };

  // Return submit form
  return (
    <CustomerForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      Create
    </CustomerForm>
  );
};

// Export CreateCustomer Component
export default CreateCustomer;
