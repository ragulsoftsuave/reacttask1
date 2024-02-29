
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const schema=z.object({
    email:z.string().email(),
    password:z.string().min(8)
})
export default function Register() {
  const { register, handleSubmit, setError, formState:{errors, isSubmitting} } = useForm({
    defaultValues:{
        email:"test@gmail.com",
    },
    resolver: zodResolver(schema),
  });
  const onSubmit = async (data) => {
    try {await new Promise((resolve, reject) => setTimeout(resolve, 1000))
        // throw new Error();
        console.log(data);} 
    catch (error) {
        setError("root",{
                message:"this email is already taken",
            });
    }
  };
  return (
    <div className="hook-form">
      <form
        action=""
        className="hook-form-login gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("email",)}
          type="email"
          name="email"
          id="email"
          placeholder="email"
        />
        <br />
        {errors.email&&<div className="errors text-red-500">{errors.email.message}</div>}
        <input
          {...register("password",)}
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <br />
        {errors.password&&<div className="errors text-red-500">{errors.password.message}</div>}
        <button disabled={isSubmitting} type="submit">{isSubmitting?"submitting...":"submit"}</button>
        {errors.root&&<div className="errors text-red-500">{errors.root.message}</div>}

      </form>
    </div>
  );
}
// export default function Register() {
//     return(<div className="notfound-wrap">
//         <h1>Registration Page!</h1>

//     </div>)
// }
