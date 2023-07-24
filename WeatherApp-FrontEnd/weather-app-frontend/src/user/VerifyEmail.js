import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ICON from "../images/envelope-open.svg";
import LOGO from "../images/weatherAppLogo.svg";
import { verifyEmailApi } from "../util/ApiUtil";

const VerifyEmail = () => {
  const { verificationCode } = useParams();
  let navigate = useNavigate();


  const onFormSubmit = async (values) => {
    const apiResponse = await verifyEmailApi(values.verificationCode);

    if (apiResponse.status === 1) {
      toast("Congratulations your email has been successfully verified!");
      navigate("/login");
    } else {
      toast(apiResponse.payLoad);
    }
  };

  const emailVerificationSchema = Yup.object().shape({
    verificationCode: Yup.string().required(
      "Email verification code is required"
    ),
  });

  return (
    <div className="p-10">
      <img alt="WeatherApp Logo" className="auto auto" src={LOGO} />
      <div>
        <div class="flex items-center justify-center min-h-screen p-5 min-w-screen">
          <div class="max-w-xl p-8 text-center text-[rgba-(132,132,1)] bg-white shadow-xl lg:max-w-3xl rounded-[20px] lg:p-12">
            <h3 class="text-2xl">Thanks for Signing Up! </h3>
            <div class="p-5 flex justify-center">
              <img alt="Envelope open icon" className="auto auto" src={ICON} />
            </div>
            <p>
              We're happy you're here.
              <br />
              <p>Below is your verification code</p>
            </p>
            <Formik
              initialValues={{
                verificationCode: verificationCode,
              }}
              validationSchema={emailVerificationSchema}
              onSubmit={onFormSubmit}
            >
              <Form>
                <div class="mt-4">
                  <Field
                    type="verificationCode"
                    name="verificationCode"
                    className="block w-full mt-1 border-black-500 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <div className="text-red-600 text-xs italic">
                    {" "}
                    <ErrorMessage name="verificationCode" />
                  </div>
                  <br />
                  <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[rgba(100,105,219,100)] rounded-[20px] hover:bg-[rgba(66,68,237,1)] first-line:focus:outline-none focus:bg-[rgba(100,105,219,100)]">
                    Verify Email
                  </button>
                  <br />
                  <br />
                  <p>Note: The verification code is valid only for 24 hours</p>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VerifyEmail;
