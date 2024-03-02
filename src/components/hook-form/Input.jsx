import { useContext } from "react";
import { FormContext } from "./FormContext";

  export default function Input({values={} }) {
    const contextValues=useContext(FormContext);
    const errors=contextValues.errors;
    const register=contextValues.register;
    return <div className={`hook-form input-text-${values?.name}`}>
      <label htmlFor={values?.name}>{values?.text}</label>
      <input {...register(values?.name)} id={values?.name} />
      {errors[values?.name] && <span className="error">{errors[values?.name].message}</span>}
    </div>;
  }

  export  function TextArea({ values={} }) {
    const contextValues=useContext(FormContext);
    const errors=contextValues.errors;
    const register=contextValues.register;
    return <div className={`hook-form input-text-${values?.name}`}>
      <label htmlFor={values?.name}>{values?.text}</label>
      <textarea {...register(values?.name)} id={values?.name} />
      {errors[values?.name] && <span className="error">{errors[values?.name].message}</span>}
    </div>;
  }

  export  function Select({values={name:"",text:"",optionsArr:[]}, onChange=()=>{} }) {
    const contextValues=useContext(FormContext);
    const errors=contextValues.errors;
    const register=contextValues.register;
    return <div className={`hook-form input-text-${values?.name}`}>
      <label htmlFor={values?.name}>{values?.text}</label>
        <select {...register(values?.name)} id={values?.name} onChange={(e)=>onChange(e)}>
        <option value="">
          select {values?.name}
            </option>
          {values?.optionsArr?.map((option,i) => (<option key={i} value={option[values?.ref]}>
              {option.name}
            </option>))}
        </select>
        {errors[values?.name] && <span className="error">{errors[values?.name].message}</span>}
    </div>;
  }