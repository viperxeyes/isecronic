import React from "react";

const AreaDetails = ({ isNew }) => {
  return (
    <div className="bg-green-500 flex-1">
      AreaDetails {isNew ? "NWe" : "edit"}
    </div>
  );
};

export default AreaDetails;
