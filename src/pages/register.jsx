import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Country, State, City } from "country-state-city";
// import "../assets/styles/register.css";
import regi from "../assets/styles/register.module.css";
import Input, { Select, TextArea } from "../components/hook-form/Input";
import { FormContext } from "../Contexts/FormContext";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


  
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
  const navigate = useNavigate(); // <-- access navigate function
  const usersCollectionRef = React.useMemo(() => collection(db, "users"));
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  //
  const onSubmit = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredentials) => {
        console.log(userCredentials);
        delete data.confirmPassword; delete data.password;

        await addDoc(usersCollectionRef, {...data,country: Country.getCountryByCode(data.country).name,
          state: State.getStateByCodeAndCountry(data.state, data.country).name,});
          navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
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
    <div className={regi.registerContainer}>
      <div className={regi.registerFormContainer}>
        <h3 className={regi.registerFormHeading}>Regitration form</h3>

        <form onSubmit={handleSubmit(onSubmit)} className={regi.registerForm}>
          <FormContext.Provider
            value={{ errors: errors, register: register, control: control }}
          >
            <Input values={{ name: "name", text: "Name", type: "text" }} />
            <Input
              values={{ name: "initial", text: "Initial", type: "text" }}
            />
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
            <Input
              values={{ name: "password", text: "Password", type: "password" }}
            />
            <Input
              values={{
                name: "confirmPassword",
                text: "Confirm Password",
                type: "password",
              }}
            />
          </FormContext.Provider>

          <div className={regi.formInput_button}>
            <button className={regi.button} type="submit">
              Register
            </button>
          </div>
        </form>
        <div className={regi.logiWrapLink} style={{}}>
          <Link className={regi.logiLink} to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
