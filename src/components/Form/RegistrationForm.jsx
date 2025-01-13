import { Link } from "react-router";
import Field from "./Field";
import FieldSet from "./FieldSet";
import { useForm } from "react-hook-form";

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = (formData) => {
    console.log(formData);
  };
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(submitForm)}>
        <FieldSet label={"Please Register Your Information"}>
          <Field label={"First Name"}>
            <input
              {...register("first_name")}
              type="text"
              id="first_name"
              name="first_name"
              placeholder="Enter First Name"
              className="border-2 w-full px-3 py-2 rounded-sm text-black font-medium"
            />
          </Field>
          <Field label={"Last Name"}>
            <input
              {...register("last_name")}
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Enter Last Name"
              className="border-2 w-full px-3 py-2 rounded-sm text-black font-medium"
            />
          </Field>
          <Field label={"Email"}>
            <input
              {...register("email")}
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              className="border-2 w-full px-3 py-2 rounded-sm text-black font-medium"
            />
          </Field>
          <Field label={"Password"}>
            <input
              {...register("password")}
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              className="border-2 w-full px-3 py-2 rounded-sm text-black font-medium"
            />
          </Field>
          <Field label={"Age"}>
            <input
              {...register("age")}
              type="number"
              id="age"
              name="age"
              placeholder="Enter Your Age"
              className="border-2 w-full px-3 py-2 rounded-sm text-black font-medium"
            />
          </Field>
          <Field>
            <input
              type="submit"
              className="px-2 py-2 border border-cyan-500 font-medium text-sm text-cyan-500 rounded-xs w-full hover:bg-cyan-500 hover:text-white transition-all duration-300 rounded-sm mt-2"
            />
          </Field>
          <p className="text-sm font-medium text-gray-700">
            Already Have An Account?{" "}
            <Link to={"/login"}>
              <span className="text-cyan-500">Login</span>
            </Link>
          </p>
        </FieldSet>
      </form>
    </div>
  );
};

export default RegistrationForm;
