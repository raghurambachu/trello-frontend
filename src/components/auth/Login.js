import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";

import trellologo from "../../images/login/trello-logo-blue.svg";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

function validationLoginForm() {
  return Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
  });
}

function handleSubmit(values, actions, setState, history, context) {
  setState((ps) => ({ ...ps, btnText: "Logging In..." }));
  axios
    .post(`${process.env.REACT_APP_BASE_URL}/users/login`, { user: values })
    .then((res) => {
      if (res?.data?.user) {
        actions.setSubmitting(false);
        setState((ps) => ({ ...ps, btnText: "Log In" }));
        context.setState({ user: res?.data?.user });
        history.push("/");
      }
    })
    .catch((err) => {
      console.log(err.response);
      actions.setSubmitting(false);
      setState((ps) => ({
        authErr: err?.response?.data?.msg,
        btnText: "Log In",
      }));
      actions.resetForm();
    });
}

function Login(props) {
  const context = useContext(UserContext);
  const [state, setState] = useState({ authErr: "", btnText: "Log In" });
  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className="container mx-auto">
        <div className="flex justify-center py-16 trello-logo">
          <img src={trellologo} alt="Trello" />
        </div>
        <div>
          {state.authErr && (
            <h4 className="text-center text-red-400"> {state.authErr}</h4>
          )}
          <div className="w-full px-8 py-8 rounded-md shadow-lg md:w-3/4 md:mx-auto lg:w-30 ">
            <h3 className="mb-4 font-semibold text-center text-gray-800">
              Log in to Trello
            </h3>
            <Formik
              validationSchema={validationLoginForm}
              onSubmit={(values, actions) =>
                handleSubmit(values, actions, setState, props.history, context)
              }
              initialValues={{ email: "", password: "" }}
            >
              {(formik) => (
                <form onSubmit={formik.handleSubmit}>
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
                      placeholder="Enter password"
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
                Sign up for an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
