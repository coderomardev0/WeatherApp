import React, { useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import BPTN from '../images/BPTN.svg';
import LOGO from '../images/weatherAppLogo.svg';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from '../common/constants';
import { loginApi } from '../util/ApiUtil';
import { AppContext } from '../Context/applicationContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();
  const appContext = useContext(AppContext);

  const onFormSubmit = async (values, actions) => {
    const apiResponse = await loginApi(values.username, values.password);
    const { payLoad } = apiResponse;

    if (apiResponse.status === 1) {
      appContext.setSession(payLoad);
      console.log(payLoad);
      navigate("/");
      toast('Login successful');
    } else {
      actions.resetForm();
      toast(apiResponse.payLoad);
    }
  };

  const toggle = () => {
    setOpen(!open);
  };

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(USERNAME_MIN_LENGTH, 'Too Short!')
      .max(USERNAME_MAX_LENGTH, 'Too Long!')
      .required('Username cannot be empty'),
    password: Yup.string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
      .min(PASSWORD_MIN_LENGTH, 'Too Short!')
      .max(PASSWORD_MAX_LENGTH, 'Too Long!')
      .required('Password cannot be blank'),
  });

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={onFormSubmit}
    >
      <div className="p-10">
        <img alt="WeatherApp Logo" className="auto auto" src={LOGO} />
        <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 b">
          <div>
            <h3 className="text-5xl text-white font-bold text-center">
              Welcome to Weather App
            </h3>
          </div>
          <h4 className="text-1xl text-white">
            Everything you need to know about weather is only one glance away
            now!
          </h4>
          <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-[28px]">
            <Form>
              <div className="mt-4">
                <label
                  class="block text-[rgba(160,160,160,1)] text-md mb-2 text-left"
                  for="grid-first-name"
                >
                  Username
                </label>

                <div className="flex flex-col items-start">
                  <Field
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    className="placeholder-[rgba(74,74,74,1)] block w-full mt-1 bg-[rgba(217,217,217,100)] shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 rounded-[20px]"
                  />
                  <div className="text-red-600 text-xs italic">
                    {' '}
                    <ErrorMessage name="username" />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label
                  class="block text-[rgba(160,160,160,1)] text-md mb-2 text-left"
                  for="grid-first-name"
                >
                  Password
                </label>

                <div className="flex flex-row items-start">
                  <Field
                    type={open === false ? 'password' : 'text'}
                    name="password"
                    placeholder="Enter your password"
                    className="placeholder-[rgba(74,74,74,1)] block w-full mt-1 bg-[rgba(217,217,217,100)] shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 rounded-[20px]"
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
                  {' '}
                  <ErrorMessage name="password" />
                </div>
              </div>

              <Link
                to="/resetEmailLink"
                className="text-xs text-[rgba(66,68,237,1)] hover:underline"
              >
                Forgot Password?
              </Link>
              <div className="flex items-center mt-4">
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[rgba(100,105,219,100)] rounded-[20px] hover:bg-[rgba(66,68,237,1)] first-line:focus:outline-none focus:bg-[rgba(100,105,219,100)]">
                  Login
                </button>
              </div>
            </Form>

            <div className="flex items-center w-full my-4">
              <hr className="w-full" />
              <p className="px-3 ">OR</p>
              <hr className="w-full" />
            </div>

            <div className="mt-4 text-grey-600">
              Dont have an account?{' '}
              <span>
                <Link
                  to="/signup"
                  className="text-[rgba(66,68,237,1)] hover:underline"
                >
                  Sign up
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

export default Login;
