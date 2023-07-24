// import React from 'react'

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import { EMAIL_MAX_LENGTH } from "../common/constants";
import LOGO from "../images/weatherAppLogo.svg";
import { resetEmailLinkApi } from "../util/ApiUtil";

const ResetEmailLink = () => {
  const onFormSubmit = async (values, actions) => {
    //call the resetEmailLinkApi and pass the email value
    const apiResponse = await resetEmailLinkApi(values.email);
    if (apiResponse.status === 1) {
      toast(
        "You will receive a password reset email, if user with that email exists"
      );
      actions.resetForm();
    } else {
      toast(apiResponse.payLoad);
    }
  };

  const ResetEmailSchema = Yup.object().shape({
    email: Yup.string()
      .email("Looks like this is not an email")
      .matches("[^@ ]+@[^@ ]+\\.[^@ ]+", "Email is not valid")
      .max(EMAIL_MAX_LENGTH, "Email is too long")
      .required("Email cannot be empty"),
  });

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={ResetEmailSchema}
        onSubmit={onFormSubmit}
      >
        <div className="p-10">
          <img alt="WeatherApp Logo" className="auto auto" src={LOGO} />
          <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 b">
            <div>
              <h3 className="text-4xl font-bold text-white">
                Forgot Password?
              </h3>
            </div>
            <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-[28px]">
              <Form>
                <div className="mt-4">
                  <label
                    class="block text-[rgb(69,75,199)] font-bold text-md mb-2 text-left"
                    for="grid-first-name"
                  >
                    Enter your email
                  </label>
                  <div className="flex flex-col items-start">
                    <Field
                      type="text"
                      name="email"
                      placeholder="youremail@email.com"
                      className="placeholder-[rgba(74,74,74,1)] block w-full mt-1 bg-[rgba(217,217,217,100)] shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 rounded-[20px]"
                    />

                    <div className="text-red-600 text-xs italic">
                      {" "}
                      <ErrorMessage name="email" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center mt-4">
                  <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[rgba(100,105,219,100)] rounded-[20px] hover:bg-[rgba(66,68,237,1)] first-line:focus:outline-none focus:bg-[rgba(100,105,219,100)]">
                    Send Password Reset Link
                  </button>
                </div>
              </Form>
              <div className="mt-4 text-grey-600">
                Don't have an account?{" "}
                <span>
                  <Link
                    to="/signup"
                    className="text-[rgba(66,68,237,1)] hover:underline"
                  >
                    Sign up
                  </Link>
                </span>
              </div>
              <div className="mt-4 text-grey-600">
                Already have an account?{" "}
                <span>
                  <Link
                    to="/login"
                    className="text-[rgba(66,68,237,1)] hover:underline"
                  >
                    Log in
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Formik>
    </div>
  );
};

export default ResetEmailLink;
