import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { Link } from "react-router-dom";
import trellologo from "../../images/login/trello-logo-blue.svg";

function validateSignupForm() {
  return Yup.object({
    name: Yup.string()
      .min(2, "Must be 2 characters or more")
      .max(25, "Must be 25 characters or less")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
  });
}

function handleSubmit(values, actions, setState, history) {
  setState((ps) => ({ ...ps, btnText: "Signing Up..." }));
  axios
    .post(`${process.env.REACT_APP_BASE_URL}/users`, { user: values })
    .then((res) => {
      if (res?.data?.user) {
        actions.setSubmitting(false);
        setState((ps) => ({ ...ps, btnText: "Sign Up" }));
        history.push("/login");
      }
    })
    .catch((err) => {
      actions.setSubmitting(false);
      setState((ps) => ({
        authErr: err?.response?.data?.msg,
        btnText: "Sign Up",
      }));
      actions.resetForm();
    });
}

function Signup(props) {
  const [state, setState] = useState({ authErr: "", btnText: "Sign Up" });
  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className="container mx-auto">
        <div className="flex justify-center py-16 trello-logo">
          <img src={trellologo} alt="Trello" />
        </div>

        <div className="">
          {state.authErr && (
            <h4 className="text-center text-red-400"> {state.authErr}</h4>
          )}
          <div className="w-full px-8 py-4 rounded-md shadow-lg md:w-3/4 md:mx-auto lg:w-30 ">
            <h3 className="mb-4 font-semibold text-center text-gray-800">
              Signup for your account
            </h3>
            <Formik
              validationSchema={validateSignupForm}
              initialValues={{ email: "", name: "", password: "" }}
              onSubmit={(values, actions) =>
                handleSubmit(values, actions, setState, props.history)
              }
            >
              {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-6">
                    <input
                      type="text"
                      placeholder="Enter full name"
                      className="block w-full p-2 border rounded-md focus:outline-none "
                      name="name"
                      id="name"
                      {...formik.getFieldProps("name")}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <small className="text-red-400">
                        {formik.errors.name}
                      </small>
                    ) : null}
                  </div>
                  <div className="mb-6">
                    <input
                      type="email"
                      placeholder="Enter email"
                      className="block w-full p-2 border rounded-md focus:outline-none "
                      name="email"
                      id="email"
                      {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <small className="text-red-400">
                        {formik.errors.email}
                      </small>
                    ) : null}
                  </div>
                  <div className="mb-6 ">
                    <input
                      type="password"
                      placeholder="Create password"
                      className="block w-full p-2 border rounded-md focus:outline-none "
                      name="password"
                      id="password"
                      {...formik.getFieldProps("password")}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <small className="text-red-400">
                        {formik.errors.password}
                      </small>
                    ) : null}
                  </div>
                  <small className="inline-block mb-4 leading-tight">
                    By signing up, you confirm that you've read and accepted our
                    Terms of Service and Privacy Policy.
                  </small>
                  <button
                    type="submit"
                    className={`block w-full py-2 mb-6 font-bold text-green-100 bg-green-500 rounded-md ${
                      formik.isSubmitting ? "cursor-not-allowed" : ""
                    } `}
                  >
                    {state.btnText}
                  </button>
                </form>
              )}
            </Formik>
            <hr />
            <div className="text-center">
              <Link to="/signup" className="text-sm text-indigo-700 ">
                Already have an account? Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
