import React from "react";

function SubTitle({ className, ...props }) {
  return <h3 className={`${className} text-lg font-semibold`} {...props} />;
}

export default SubTitle;
