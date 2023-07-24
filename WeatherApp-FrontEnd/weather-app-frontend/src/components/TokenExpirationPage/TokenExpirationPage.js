import React from "react";
import rainyday from "../../images/rainyday.png";
import icon from "../../images/time.png";

const TokenExpirationPage = () => {
  return (
    <div class="flex items-center justify-center min-h-screen min-w-screen">
      <div class="max-w-lg bg-white rounded-[28px] shadow dark:bg-gray-800 pb-10 ">
        <a href="#">
          <img
            class="rounded-t-[28px]"
            src={rainyday}
            alt="sunset illustration"
          />
        </a>
        <div class="p-5">
          <a href="#">
            <h5 class="pt-3 pb-3 text-center mb-2 text-3xl font-bold tracking-tight text-gray-800 dark:text-white">
              Your Session Token Has Expired
            </h5>
          </a>
        </div>
        <div class="flex items-center justify-center">
          <img src={icon} alt="icon" />
        </div>
        <div>
          <p class="text-center mb-3 font-normal text-lg text-gray-700 dark:text-gray-400">
            You will be redirected to the login page upon refresh.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TokenExpirationPage;
