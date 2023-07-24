import React from "react";
import sunset from "../../images/sunset.png";

const NoHistoryWeatherPresent = () => {
  return (
    <div class="flex items-center justify-center min-h-screen min-w-screen">
      <div class="max-w-lg bg-white rounded-[28px] shadow dark:bg-gray-800 pb-10 ">
        <a href="#">
          <img
            class="rounded-t-[28px]"
            src={sunset}
            alt="sunset illustration"
          />
        </a>
        <div class="p-5">
          <a href="#">
            <h5 class="pt-3 pb-3 text-center mb-2 text-3xl font-bold tracking-tight text-gray-800 dark:text-white">
              We're Happy You're Here!
            </h5>
          </a>
          <p class="text-center mb-3 font-normal text-lg text-gray-700 dark:text-gray-400">
            No history weather data present yet. Browse for weather data and
            come back here!
          </p>
        </div>
      </div>
    </div>
  );
};
export default NoHistoryWeatherPresent;

