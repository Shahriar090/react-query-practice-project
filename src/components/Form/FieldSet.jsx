const FieldSet = ({ label, children }) => {
  return (
    <fieldset className="m-2 border p-6 w-3/6 mx-auto">
      {label && <legend className="text-lg font-bold mb-2">{label}</legend>}
      <div className="flex flex-col gap-1 justify-between self-start">
        {children}
      </div>
    </fieldset>
  );
};

export default FieldSet;
