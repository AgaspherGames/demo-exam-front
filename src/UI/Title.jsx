import React from "react";

export default function Title({ className, ...props }) {
  return <h3 className={`${className} text-2xl font-semibold`} {...props} />;
}
