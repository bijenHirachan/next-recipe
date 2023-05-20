import React from "react";

const Loading = () => {
  return (
    <div className="h-[70vh] flex justify-center items-center">
      <div
        className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-amber-600 border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
      </div>
    </div>
  );
};

export default Loading;
