import { useContext } from "react";
import { FormContext } from "./FormContext";
import regi from "../../assets/styles/register.module.css";
import { Controller } from "react-hook-form";

  export default function Input({values={} }) {
    const contextValues=useContext(FormContext);
    const errors=contextValues.errors;
    const register=contextValues.register;
    return <div className={`${regi['formInput_'+values?.name]}`}>
      <label className={regi.label} htmlFor={values?.name}>{values?.text}</label>
      <input className={regi.input} {...register(values?.name)} id={values?.name} />
      {<div className={regi.error}>{errors[values?.name]?.message}</div>}
    </div>;
  }

  export  function TextArea({ values={} }) {
    const contextValues=useContext(FormContext);
    const errors=contextValues.errors;
    const register=contextValues.register;
    return <div className={`${regi['formInput_'+values?.name]}`}>
      <label className={regi.label} htmlFor={values?.name}>{values?.text}</label>
      <textarea className={regi.input} {...register(values?.name)} id={values?.name} />
      {<div className={regi.error}>{errors[values?.name]?.message}</div>}
    </div>;
  }

  export  function Select({values={name:"",text:"",optionsArr:[]}, onChange=()=>{} }) {
    const contextValues=useContext(FormContext);
    const errors=contextValues.errors;
    const register=contextValues.register;
    const control=contextValues.control;

    return <div className={`${regi['formInput_'+values?.name]}`}>
      <label className={regi.label} htmlFor={values?.name}>{values?.text}</label>
      <Controller
          name="mySelect" // Should match the field name in the form data
          control={control} // Set the default value
          render={({ field }) => (
            <select className={regi.input}  {...field} {...register(values?.name)} id={values?.name} onChange={(e)=>onChange(e)} >
              {/* <option value="" disabled>Select an option</option> */}
              <option value="">
          select {values?.name}
            </option>
          {values?.optionsArr?.map((option,i) => (<option key={i} value={option[values?.ref]}>
              {option.name}
            </option>))}
            </select>
          )}
        />
        
        {<div className={regi.error}>{errors[values?.name]?.message}</div>}
    </div>;
  }
  
  // export  function Select({values={name:"",text:"",optionsArr:[]}, onChange=()=>{} }) {
  //   const contextValues=useContext(FormContext);
  //   const errors=contextValues.errors;
  //   const register=contextValues.register;
  //   return <div className={`${regi['formInput_'+values?.name]}`}>
  //     <label className={regi.label} htmlFor={values?.name}>{values?.text}</label>
  //       <select className={regi.input} {...register(values?.name)} id={values?.name} onChange={(e)=>onChange(e)}>
  //       <option value="">
  //         select {values?.name}
  //           </option>
  //         {values?.optionsArr?.map((option,i) => (<option key={i} value={option[values?.ref]}>
  //             {option.name}
  //           </option>))}
  //       </select>
  //       {<div className={regi.error}>{errors[values?.name]?.message}</div>}
  //   </div>;
  // }

  {
    // className={`${regi.hookForm} ${regi['formInput_'+values?.name]}`}
  }