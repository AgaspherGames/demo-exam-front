import React from "react";

export default function Card({ className, ...props }) {
  return <div className={`${className} border p-8 rounded-sm`} {...props} />;
}
