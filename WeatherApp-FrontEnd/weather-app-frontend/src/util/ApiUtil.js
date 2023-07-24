import axios from "axios";
import { API_BASE_URL } from "../common/constants";

const frameToken = (token) => `Bearer ${token}`;

const frameResponse = (
  reqStatus = 0,
  reqPayLoad = "Invalid request. Please try again later."
) => {
  return {
    status: reqStatus,
    payLoad: reqPayLoad,
  };
};

export const signUpApi = async (
  firstName,
  lastName,
  username,
  phone,
  emailId,
  password
) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/user/signup`;
    const apiResponse = await axios.post(url, {
      firstName,
      lastName,
      username,
      phone,
      emailId,
      password,
    });
    if (apiResponse.status === 200) {
      response = frameResponse(1);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

export const verifyEmailApi = async (token) => {
  let response = frameResponse();

  try {
    const url = `${API_BASE_URL}/user/verify/email`;
    const header = { headers: { Authorization: frameToken(token) } };
    const apiResponse = await axios.get(url, header);

    if (apiResponse.status === 200) {
      response = frameResponse(1, apiResponse.data);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

export const loginApi = async (username, password) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/user/login`;
    const apiResponse = await axios.post(url, { username, password });
    if (apiResponse.status === 200) {
      const payLoad = {
        token: apiResponse.headers.authorization,
        username: apiResponse.data.username,
      };
      response = frameResponse(1, payLoad);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

export const resetEmailLinkApi = async (email) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/user/reset/${email}`;
    const apiResponse = await axios.get(url, { email });
    if (apiResponse.status === 200) {
      response = frameResponse(1);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

export const resetPasswordApi = async (token, password) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/user/reset?password=${password}`;
    const headers = { headers: { Authorization: frameToken(token) } };
    const apiResponse = await axios.post(url, {}, headers);

    if (apiResponse.status === 200) {
      response = frameResponse(1);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

export const getWeatherDataApi = async (token, location, save) => {
  const url = `${API_BASE_URL}/weathers/${location}/${save}`;
  const headers = {
    headers: { Authorization: frameToken(token) },
  };
  const apiResponse = await axios.get(url, headers);
  return apiResponse;
};

export const getHistoryWeatherDataApi = async (token) => {
  let response = undefined;
  try{
    const url = `${API_BASE_URL}/weathers`;
    const headers = { headers: { Authorization: frameToken(token) } };
    const apiResponse = await axios.get(url, headers);
    if (apiResponse.status === 200){
      response = apiResponse.data;
    }
  }catch (err){
    if (err.response){
      response = err;
    }
    console.log(err);
  }finally{
    return response;
  }
};
