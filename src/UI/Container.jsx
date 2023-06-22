import React from "react";

export default function Container({ className, ...props }) {
  return <div className={`${className} w-4/5 mx-auto`} {...props} />;
}
