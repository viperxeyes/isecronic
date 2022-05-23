import React from "react";

import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/personas";

const AccountButton = () => {
  let colorArray = [
    "#f44336",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#009688",
    "#4caf50",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#795548",
    "#9e9e9e",
    "#607d8b",
  ];
  //   const generateRandomColor = () => {
  //     let letters = "0123456789ABCDEF";
  //     let color = "#";
  //     for (let i = 0; i < 6; i++) {
  //       color += letters[Math.floor(Math.random() * 16)];
  //     }
  //     return color;
  //   };

  let svg = createAvatar(style, {
    seed: "Dia Eldin",
    // ... and other options
    dataUri: true,
    backgroundColor: colorArray[Math.floor(Math.random() * colorArray.length)],
    //backgroundColor: generateRandomColor(),
  });

  //a function that generate random color

  return (
    <button className="flex justify-between items-center w-full  h-full border-transparent  hover:opacity-70 transition-all duration-300 ease-out">
      <div className="flex items-center justify-center">
        <img src={svg} className=" w-12 h-12 rounded-full" alt="account icon" />
        <div className="ml-4">Dia Eldin</div>
      </div>

      <i className="mr-4 fa fa-chevron-down fa-md"></i>
    </button>
  );
};

export default AccountButton;
