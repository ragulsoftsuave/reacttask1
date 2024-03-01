export default function Input({register, errors, }) {
    return <div>
      <label htmlFor="name">Name</label>
      <input {...register("name", { required: true })} id="name" />
      {errors.name && <span className="error">{errors.name.message}</span>}
    </div>;
  }