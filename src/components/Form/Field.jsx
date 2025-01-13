import React from "react";

const Field = ({ label, children, htmlFor, error }) => {
  const getChildId = (children) => {
    const child = React.Children.only(children);

    if ("id" in child?.props) {
      return child.props.id;
    }
  };

  const id = htmlFor || getChildId(children);
  return (
    <div className="flex flex-col items-start justify-start w-3/4 mx-auto">
      {label && <label htmlFor={id}>{label}</label>}
      {children}
      {!!error && (
        <div className="text-red-500 font-semibold">{error.message}</div>
      )}
    </div>
  );
};

export default Field;
