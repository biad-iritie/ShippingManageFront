import React from "react";

const Brand = ({ children }) => {
  return (
    <div className="flex items-center justify-between brand-area">
      <div className="flex items-center brand">
        {/* <img src="/assets/images/logo.png" alt="company-logo" /> */}
        <img src="/assets/images/LogoShipManOnglet.png" alt="company-logo" />
        <span className="brand__text">ShipMan</span>
      </div>
      {children}
    </div>
  );
};

export default Brand;
