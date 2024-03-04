import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import z from "zod";
const schema = z
  .object({
    mySelect: z.string().min(1, "Name is required")})
const MyForm = () => {
  const { control, handleSubmit,
    formState: { errors }, } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Other form fields can go here */}

      <div>
        <label htmlFor="mySelect">Select an option:</label>
        <Controller
          name="mySelect" // Should match the field name in the form data
          control={control}
          defaultValue="" // Set the default value
          render={({ field }) => (
            <select {...field}>
              <option value="" disabled>Select an option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          )}
        />
      </div>
      {<div >{errors.mySelect?.message}</div>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
