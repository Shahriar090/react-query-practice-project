import { loginWithEmailAndPassword } from "../../firebase/firebase";
import Field from "./Field";
import FieldSet from "./FieldSet";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const navigate = useNavigate();

  // login submit form
  const submitForm = async (formData) => {
    try {
      const { email, password } = formData;
      const result = await loginWithEmailAndPassword(email, password);
      navigate("/");
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(submitForm)}>
        <FieldSet label={"Enter Login Details"}>
          <Field label={"Email"} error={errors.email}>
            <input
              {...register("email", { required: "Email Is Required" })}
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email Address"
              className="border-2 w-full px-3 py-2 rounded-sm text-black font-medium"
            />
          </Field>
          <Field label={"Password"} error={errors.password}>
            <input
              {...register("password", {
                required: "Password Is Required",
                minLength: {
                  value: 6,
                  message: "Password Must Be At Least Minimum 6 Characters.!",
                },
                maxLength: {
                  value: 20,
                  message: "Password Cannot Be More Than 20 Characters.!",
                },
              })}
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password"
              className="border-2 w-full px-3 py-2 rounded-sm text-black font-medium"
            />
          </Field>
          {/* error div */}
          <div>
            <span className="text-red-500">
              {errors?.root?.random && errors?.root?.random?.message}
            </span>
          </div>
          <Field>
            <input
              type="submit"
              className="px-2 py-2 border border-cyan-500 font-medium text-sm text-cyan-500 rounded-xs w-full hover:bg-cyan-500 hover:text-white transition-all duration-300 rounded-sm mt-2"
            />
          </Field>
          <p className="text-sm font-medium text-gray-700">
            New Here?{" "}
            <Link to={"/register"}>
              <span className="text-cyan-500">Register</span>
            </Link>
          </p>
        </FieldSet>
      </form>
    </div>
  );
};

export default LoginForm;
