// *****  Import Modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import FormikControl from '../../Components/Formik/Control';

const CustomerCreate = (props) => {
  // ***** setting variable
  const baseURL =
    'https://61c4403ef1af4a0017d99432.mockapi.io/api/kiswire/dev/customer';
  const stateURL =
    'https://61c4403ef1af4a0017d99432.mockapi.io/api/kiswire/dev/state';
  const districtURL =
    'https://61c4403ef1af4a0017d99432.mockapi.io/api/kiswire/dev/district';
  // console.log(baseURL + props.match.params.slug);
  const latestdate = Date();
  const [stateValue, setStateValue] = useState([]);
  const [districtValue, setDistrictValue] = useState([]);
  const [formValues, setFormValues] = useState({
    id: '',
    cname: '',
    caddress: '',
    cstate: '',
    cdistrict: '',
  });

  const [selected, setSelected] = useState('');
  const StateHandler = (event) => {
    // console.log(event);
    const { value } = event.target;
    formValues.cstate = value;
    LoadDistrict();
  };
  // ***** Refresh LoadDistrict
  const LoadDistrict = () => {
    // console.log('LoadDistrict');
    axios
      .get(districtURL)
      .then((response) => {
        // console.log(response.data);
        setDistrictValue(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // ***** Form Validation Schema
  const validationSchema = Yup.object({
    cname: Yup.string().required('Required'),
    caddress: Yup.string().required('Required'),
    cstate: Yup.string().required('Required'),
    cdistrict: Yup.string().required('Required'),
    // courseDate: Yup.date().required('Required').nullable(),
  });
  // ***** Form Submited
  const onSubmit = (values) => {
    console.log('Form data', values);
    values.ccreatedAt = new Date();
    // axios
    //   .post(baseURL, values)
    //   .then((res) => {
    //     // console.log(baseURL);
    //     // console.log(values);
    //     if (res.status === 201) {
    //       alert('Successfully Created');
    //       props.history.push('/customer/list');
    //     } else Promise.reject();
    //   })
    //   .catch((err) => alert('Something went wrong'));
  };

  // ***** Load State Data
  useEffect(() => {
    async function fetchStateData() {
      axios
        .get(stateURL)
        .then((response) => {
          // console.log(response.data);
          setStateValue(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchStateData();
  }, []);

  // ***** Load District Data
  useEffect(() => {
    async function fetchDistrictData() {
      axios
        .get(districtURL)
        .then((response) => {
          // console.log(response.data);
          setDistrictValue(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchDistrictData();
  }, []);
  // ***** return
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-8">
          <h2>Create New Record</h2>
        </div>
        <div className="col" align="right"></div>
      </div>
      <div className="row justify-content-md-center">
        <div className="col">
          <Formik
            initialValues={formValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            setFieldValue
          >
            {(formik) => {
              return (
                <Form>
                  <FormikControl
                    className="form-control"
                    control="input"
                    type="text"
                    label="Customer Name"
                    name="cname"
                    disabled={formik.isSubmitting}
                  />
                  <FormikControl
                    className="form-control"
                    control="textarea"
                    type="text"
                    label="Address"
                    name="caddress"
                    disabled={formik.isSubmitting}
                  />
                  <div className="row justify-content-md-center">
                    <div className="col-6">
                      <div className="form-group">
                        <label for="cstate">State Name: </label>
                        <Field
                          name="cstate"
                          as="select"
                          className="form-control"
                          value={props.value}
                          onChange={StateHandler}
                          // onClick={(e) => {
                          //   // console.log(e)
                          //   const { value } = e.target;
                          //   // console.log(value);
                          // }}
                          // onChange={(event) => {
                          //   handleChange(event);

                          //   const { value } = event.target;
                          //   console.log(value);
                          //   if (!value) {
                          //     // setDistrictValue=[];
                          //   } else {
                          //     // setDistrictValue=[];
                          //   }
                          // }}
                          disabled={formik.isSubmitting}
                        >
                          <option value="">Select State</option>
                          {stateValue.map((value) => (
                            <option value={value.name} key={value.id}>
                              {value.name}
                            </option>
                          ))}
                        </Field>
                        {formik.errors.cstate ? (
                          <div className="d-block invalid-feedback">
                            {formik.errors.cstate}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label for="cdistrict">District Name: </label>
                        <Field
                          name="cdistrict"
                          as="select"
                          className="form-control"
                          disabled={formik.isSubmitting}
                        >
                          <option value="">Select District</option>

                          {districtValue
                            .filter(
                              (state) => state.dstate === formValues.cstate
                            )
                            .map((value) => (
                              <option value={value.dname} key={value.id}>
                                {value.dname}
                              </option>
                            ))}
                        </Field>
                        {formik.errors.cdistrict ? (
                          <div className="d-block invalid-feedback">
                            {formik.errors.cdistrict}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <hr />
                  <Link to={'/customer/List'} className="btn btn-warning">
                    Back
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={formik.isSubmitting}
                  >
                    Create
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default CustomerCreate;
