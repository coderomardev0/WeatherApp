import React, { useState, useEffect } from "react";
import { getHistoryWeatherDataApi } from "../../util/ApiUtil";
import DisplayWeatherData from "../CurrentWeatherData/DisplayWeatherData";
import NoHistoryWeatherPresent from "./NoHistoryWeatherPresent";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import TokenExpirationPage from "../TokenExpirationPage/TokenExpirationPage";

const HistoryWeatherData = ({ currentUser }) => {
  const [results, setResults] = useState([]);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyResults();
  }, []);

  const getMyResults = async () => {
    setLoading(true);
    const apiResponse = await getHistoryWeatherDataApi(currentUser.token);
    if (apiResponse && apiResponse.length > 0) {
      setResults(apiResponse);
      setData(true);
      setLoading(false);
    } else if (apiResponse && apiResponse.length === 0) {
      setData(false);
      setLoading(false);
    } else if (apiResponse.response.data.httpStatusCode === 401) {
      setTokenExpired(true);
      setLoading(false);
    }
  };

  if (tokenExpired) {
    return <TokenExpirationPage />;
  }

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center">
        <NoHistoryWeatherPresent />
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {results.map((item, index) => (
          <div
            key={index}
            className="bg-white/30 text-white backdrop-blur-[80px] py-12 px-6 rounded-lg overflow-hidden"
          >
            <DisplayWeatherData apiResponse={item} />
          </div>
        ))}
      </div>
    );
  }
};

export default HistoryWeatherData;
