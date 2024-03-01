import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import  {z} from "zod";
import { Country, State, City }  from 'country-state-city';
import "../assets/styles/register.css";
import Input from "../components/Input";

let countriesArr=Country.getAllCountries();
let statesArr=undefined;

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  // name: z.string().nonempty("Name is required"),
  initial: z.string().max(1, "Initial should be a single character"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  phone: z.string().min(10, "Phone number should be at least 10 digits").min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  district: z.string().min(1, "District is required"),
  password: z.string().min(1, 'The Password field is required').min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6).max(50).refine((data) =>{return true}, {
    message: 'Passwords do not match',
  }),}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],});

export default function Register() {
  const {register,handleSubmit,formState: { errors },} = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
  };
const [currentCountry,setCurrentCountry]=useState(undefined);
const [districtsArr,setDistrictsArr]=useState([]);
  const handleCountryChange = (event) => {
    setCurrentCountry(event.target.value);
    statesArr=State.getStatesOfCountry(event.target.value);
  };
  const handleStateChange = (event) => {
    setDistrictsArr(City.getCitiesOfState(currentCountry, event.target.value));
  };

  return (
    <div className="register-container">
      
    <form onSubmit={handleSubmit(onSubmit)} className="register-form">
    <h3>Regitration form</h3>
  <Input register={()=>register} errors={errors}/>
      {/* {newFunction(register, errors)} */}
      <div>
        <label htmlFor="initial">Initial</label>
        <input {...register("initial", { maxLength: 1 })} id="initial" />
        {errors.initial && <span className="error">{errors.initial.message}</span>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" {...register("email", { required: true })} id="email" />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>
      <div>
        <label htmlFor="phone">Phone</label>
        <input type="tel" {...register("phone", { required: true })} id="phone" />
        {errors.phone && <span className="error">{errors.phone.message}</span>}
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <textarea {...register("address", { required: true })} id="address" />
        {errors.address && <span className="error">{errors.address.message}</span>}
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <select id="country" {...register("country", { required: true })} onChange={(e)=>handleCountryChange(e)}>
        <option value="">
          select country
            </option>
          {countriesArr?.map((country) => (<option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>)
            
          )}
        </select>
        {errors.country && <span className="error">{errors.country.message}</span>}
      </div>
      <div>
        <label htmlFor="state">State</label>
        <select id="state" {...register("state", { required: true })} onChange={handleStateChange}>
        <option value="">
          select state
            </option>
          {statesArr?.map((state) => (
            <option key={state.isoCode} value={state.isoCode}>
              {state.name}
            </option>
          ))}
        </select>
        {errors.state && <span className="error">{errors.state.message}</span>}
      </div>
      <div>
        <label htmlFor="district">District</label>
        <select id="district" {...register("district", { required: true })} >
        <option value="">
          select district
            </option>
          {districtsArr?.map((district,i) => (
            <option key={i} value={district.isoCode}>
              {district.name}
            </option>
          ))}
        </select>
        {errors.district && <span className="error">{errors.district.message}</span>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" {...register("password", { required: true })} id="password" />
        {errors.password && <span className="error">{errors.password.message}</span>}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" {...register("confirmPassword", { required: true })} id="confirmPassword" />
        {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
      </div>
      <button type="submit">Register</button>
    </form>
    </div>
  );
}

function newFunction(register, errors) {
  return <div>
    <label htmlFor="name">Name</label>
    <input {...register("name", { required: true })} id="name" />
    {errors.name && <span className="error">{errors.name.message}</span>}
  </div>;
}
