import Field from "./Field";
import FieldSet from "./FieldSet";

const LoginForm = () => {
  return (
    <div>
      <form>
        <FieldSet label={"Enter Login Details"}>
          <Field label={"Email"}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email Address"
              className="border-2 w-full px-3 py-2 rounded-sm text-black font-medium"
            />
          </Field>
          <Field label={"Password"}>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password"
              className="border-2 w-full px-3 py-2 rounded-sm text-black font-medium"
            />
          </Field>

          <Field>
            <input
              type="submit"
              className="px-2 py-2 border border-cyan-500 font-medium text-sm text-cyan-500 rounded-xs w-full hover:bg-cyan-500 hover:text-white transition-all duration-300 rounded-sm mt-2"
            />
          </Field>
        </FieldSet>
      </form>
    </div>
  );
};

export default LoginForm;
