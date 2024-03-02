import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Country, State, City } from "country-state-city";
import "../assets/styles/register.css";
import Input, { Select, TextArea } from "../components/hook-form/Input";
import { FormContext } from "../components/hook-form/FormContext";

let countriesArr = Country.getAllCountries();
let statesArr = undefined;

const schema = z
  .object({
    name: z.string().min(1, "Name is required"),
    // name: z.string().nonempty("Name is required"),
    initial: z
      .string()
      .min(1, "Initial is required")
      .max(1, "Initial should be a single character"),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    phone: z
      .string()
      .min(10, "Phone number should be at least 10 digits")
      .min(1, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    district: z.string().min(1, "District is required"),
    password: z
      .string()
      .min(1, "The Password field is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6)
      .max(50)
      .refine(
        (data) => {
          return true;
        },
        {
          message: "Passwords do not match",
        }
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  //
  const onSubmit = (data) => {
    console.log(data);
  };
  const [currentCountry, setCurrentCountry] = useState(undefined);
  const [districtsArr, setDistrictsArr] = useState([]);
  const handleCountryChange = (event) => {
    setCurrentCountry(event.target.value);
    statesArr = State.getStatesOfCountry(event.target.value);
  };
  const handleStateChange = (event) => {
    setDistrictsArr(City.getCitiesOfState(currentCountry, event.target.value));
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <h3>Regitration form</h3>
        <FormContext.Provider value={{ errors: errors, register: register }}>
          {/* <Input register={{...register("name", { required: true })}} errors={errors}/> */}

          <Input values={{ name: "name", text: "Name", type: "text" }} />
          <Input values={{ name: "initial", text: "Initial", type: "text" }} />
          <Input values={{ name: "email", text: "Email", type: "email" }} />
          <Input values={{ name: "phone", text: "Phone", type: "tel" }} />
          <TextArea values={{ name: "address", text: "Address" }} />
          <Select
            values={{
              name: "country",
              text: "Country",
              optionsArr: countriesArr,
              ref: "isoCode",
            }}
            onChange={handleCountryChange}
          />
          <Select
            values={{
              name: "state",
              text: "State",
              optionsArr: statesArr,
              ref: "isoCode",
            }}
            onChange={handleStateChange}
          />
          <Select
            values={{
              name: "district",
              text: "District",
              optionsArr: districtsArr,
              ref: "name",
            }}
          />
          {/* <Select register={register("state")} values={{name:"state",text:"State",optionsArr:countriesArr,ref:"isoCode"}} onChange={handleStateChange}/> */}
        </FormContext.Provider>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
            id="password"
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword", { required: true })}
            id="confirmPassword"
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword.message}</span>
          )}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
