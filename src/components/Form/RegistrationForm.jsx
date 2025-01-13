import { Link } from "react-router";
import Field from "./Field";
import FieldSet from "./FieldSet";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import NumberInput from "./NumberInput";

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    name: "socials",
    control,
  });
  const submitForm = (formData) => {
    console.log(formData);
  };
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(submitForm)}>
        <FieldSet label={"Please Enter Your Basic Information"}>
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
            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                <NumberInput
                  id="age"
                  className="border-2 w-full px-3 py-2 rounded-sm text-black font-medium"
                  {...field}
                />
              )}
              rules={{
                max: { value: 100, message: "Age Can Be Between 0 And 100" },
              }}
            />
          </Field>

          <p className="text-sm font-medium text-gray-700">
            Already Have An Account?{" "}
            <Link to={"/login"}>
              <span className="text-cyan-500">Login</span>
            </Link>
          </p>
        </FieldSet>

        {/* adding dynamic field for social handles */}
        <FieldSet label={"Add Your Social Handles"}>
          {fields.map((field, index) => {
            return (
              <div className="flex gap-2 items-center" key={field.id}>
                <Field label={"Social Name"}>
                  <input
                    type="text"
                    {...register(`socials[${index}].name`)}
                    id={`socials[${index}].name`}
                    name={`socials[${index}].name`}
                    className="border-2 w-full px-3 py-2 rounded-sm text-black font-medium"
                  />
                </Field>
                <Field label={"Social Links"}>
                  <input
                    type="text"
                    {...register(`socials[${index}].url`)}
                    id={`socials[${index}].url`}
                    name={`socials[${index}].url`}
                    className="border-2 w-full px-3 py-2 rounded-sm text-black font-medium"
                  />
                </Field>

                {/* button to remove fields */}
                <button
                  onClick={() => remove(index)}
                  className="text-red-500  text-xs font-medium"
                >
                  Remove
                </button>
              </div>
            );
          })}
          <button
            onClick={() => append({ name: "", url: "" })}
            className="border rounded-lg p-2 mx-auto hover:bg-gray-100 text-black w-fit mt-2 text-xs font-medium"
          >
            Add Field
          </button>

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

export default RegistrationForm;
