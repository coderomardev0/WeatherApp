import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import BPTN from "../images/BPTN.svg";
import LOGO from "../images/weatherAppLogo.svg";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import {
  FIRSTNAME_MIN_LENGTH,
  FIRSTNAME_MAX_LENGTH,
  LASTNAME_MIN_LENGTH,
  LASTNAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from "../common/constants";
import { signUpApi } from "../util/ApiUtil";

const Signup = () => {
  const [open, setOpen] = useState(false);

  /* const onFormSubmit = async (values) => {
    console.log(values);
    toast(`Congratulations on successfully signing up!`);
  }; */

  const onFormSubmit = async (values, actions) => {
    //call the signUpApi and pass the field values
    const apiResponse = await signUpApi(
      values.firstName,
      values.lastName,
      values.username,
      values.phone,
      values.email,
      values.password
    );

    if (apiResponse.status === 1) {
      toast(
        `Congratulations on successfully signing up!! Verification email has been sent to ${values.email}`
      );
      actions.resetForm();
    } else {
      toast(apiResponse.payLoad);
      actions.resetForm();
    }
  };

  const toggle = () => {
    setOpen(!open);
  };

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(FIRSTNAME_MIN_LENGTH, "Too Short!")
      .max(FIRSTNAME_MAX_LENGTH, "Too Long!")
      .required("First Name cannot be empty"),
    lastName: Yup.string()
      .min(LASTNAME_MIN_LENGTH, "Too Short!")
      .max(LASTNAME_MAX_LENGTH, "Too Long!")
      .required("Last Name cannot be empty"),
    username: Yup.string()
      .min(USERNAME_MIN_LENGTH, "Too Short!")
      .max(USERNAME_MAX_LENGTH, "Too Long!")
      .required("Username cannot be empty"),
    phone: Yup.string().required("Phone Number cannot be empty"),
    email: Yup.string()
      .email("Looks like this is not an email")
      .matches("[^@]+@[^@]+\\.[^@]+", "Email is not valid")
      .max(EMAIL_MAX_LENGTH, "Email is too long")
      .required("Email cannot be empty"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .min(PASSWORD_MIN_LENGTH, "Too Short!")
      .max(PASSWORD_MAX_LENGTH, "Too Long!")
      .required("Password cannot be empty"),
  });

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phone: "",
        password: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={onFormSubmit}
    >
      <div className="p-10">
        <img alt="WeatherApp Logo" className="auto auto" src={LOGO} />
        <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 b">
          <div>
            <h3 className="text-5xl font-bold text-white">Sign Up</h3>
          </div>
          <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-[28px]">
            <Form>
              <div className="mt-4">
                <label
                  class="block text-[rgba(160,160,160,1)] text-md mb-2 text-left"
                  for="grid-first-name"
                >
                  First Name
                </label>
                <div className="flex flex-col items-start">
                  <Field
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    className="placeholder-[rgba(74,74,74,1)] block w-full mt-1 bg-[rgba(217,217,217,100)] shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 rounded-[20px]"
                  />
                  <div className="text-red-600 text-xs italic">
                    {" "}
                    <ErrorMessage name="firstName" />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label
                  class="block text-[rgba(160,160,160,1)]  text-md mb-2 text-left"
                  for="grid-first-name"
                >
                  Last Name
                </label>
                <div className="flex flex-col items-start">
                  <Field
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    className="placeholder-[rgba(74,74,74,1)] block w-full mt-1 bg-[rgba(217,217,217,100)] p-2 rounded-[20px] shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <div className="text-red-600 text-xs italic">
                    {" "}
                    <ErrorMessage name="lastName" />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label
                  class="block text-[rgba(160,160,160,1)]  text-md mb-2 text-left"
                  for="grid-first-name"
                >
                  Username
                </label>
                <div className="flex flex-col items-start">
                  <Field
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    className="placeholder-[rgba(74,74,74,1)] block w-full mt-1 bg-[rgba(217,217,217,100)] p-2 rounded-[20px] shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <div className="text-red-600 text-xs italic">
                    {" "}
                    <ErrorMessage name="username" />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label
                  class="block text-[rgba(160,160,160,1)]  text-md mb-2 text-left"
                  for="grid-first-name"
                >
                  Phone
                </label>
                <div className="flex flex-col items-start">
                  <Field
                    type="text"
                    name="phone"
                    placeholder="Enter your phone number"
                    className="placeholder-[rgba(74,74,74,1)] block w-full mt-1 bg-[rgba(217,217,217,100)] p-2 rounded-[20px] shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <div className="text-red-600 text-xs italic">
                    {" "}
                    <ErrorMessage name="phone" />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label
                  class="block text-[rgba(160,160,160,1)] text-md mb-2 text-left"
                  for="grid-first-name"
                >
                  Email
                </label>
                <div className="flex flex-col items-start">
                  <Field
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                    className="placeholder-[rgba(74,74,74,1)] block w-full mt-1 bg-[rgba(217,217,217,100)] p-2 rounded-[20px] shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <div className="text-red-600 text-xs italic">
                    {" "}
                    <ErrorMessage name="email" />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label
                  class="block text-[rgba(160,160,160,1)]  text-md mb-2 text-left"
                  for="grid-first-name"
                >
                  Password
                </label>
                <div className="flex flex-row items-start">
                  <Field
                    type={open === false ? "password" : "text"}
                    name="password"
                    placeholder="Enter your password"
                    className="placeholder-[rgba(74,74,74,1)] block w-full mt-1 bg-[rgba(217,217,217,100)] p-2 rounded-[20px] shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <span className="text-2xl">
                    {open === false ? (
                      <AiFillEye onClick={toggle} />
                    ) : (
                      <AiFillEyeInvisible onClick={toggle} />
                    )}
                  </span>
                </div>
                <div className="text-red-600 text-xs italic">
                  {" "}
                  <ErrorMessage name="password" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <button
                  type="submit"
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[rgba(100,105,219,100)] rounded-[20px] hover:bg-[rgba(66,68,237,1)] first-line:focus:outline-none focus:bg-[rgba(100,105,219,100)]"
                >
                  Register
                </button>
              </div>
            </Form>
            <div className="mt-4 text-grey-600">
              Already have an account?{" "}
              <span>
                <Link
                  to="/login"
                  className="text-[rgba(66,68,237,100)] hover:underline"
                >
                  Log in
                </Link>
              </span>
            </div>
            <div className="my-6 space-y-2">
              <div className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400">
                <p>Powered by</p>
                <img className="w-20 h-10" src={BPTN} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Formik>
  );
};

export default Signup;
