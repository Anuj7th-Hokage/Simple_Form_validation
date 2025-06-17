import React, { useState } from 'react';
import * as yup from 'yup';
import './Form.css';


const Form = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phonNo: "",
    password: "",
    confirmPass: "",
    age: "",
    gender: "",
    intrest: [],
    birthDate: ""
  });

  const [errors, setErrors] = useState({});

  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox"
        ? checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value)
        : value
    }));
  };

  const validationSchema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    phonNo: yup.string().matches(/^\d{10}$/, "Phone number must be exactly 10 digits").required("Phone number is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPass: yup.string().oneOf([yup.ref("password")], "Passwords must match").required("Confirm password is required"),
    age: yup.number().typeError("Age must be a number").positive("Age must be positive").integer("Age must be an integer").required("Age is required"),
    gender: yup.string().required("Gender is required"),
    intrest: yup.array().min(1, "At least one interest must be selected"),
    birthDate: yup.string().required("Birth date is required")
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(data, { abortEarly: false });
      console.log("Form submitted:", data);
      setErrors({});
    } catch (err) {
      const errObj = {};
      err.inner.forEach((e) => {
        errObj[e.path] = e.message;
      });
      setErrors(errObj);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="firstName">First Name</label>
      <input type="text" name="firstName" value={data.firstName} onChange={changeHandler} />
      {errors.lastName &&<p style={{ color: "red" }}>{errors.firstName}</p>}
      <br />

      <label htmlFor="lastName">Last Name</label>
      <input type="text" name="lastName" value={data.lastName} onChange={changeHandler} />
      {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
      <br />

      <label htmlFor="email">Email</label>
      <input type="email" name="email" value={data.email} onChange={changeHandler} />
      {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      <br />

      <label htmlFor="phonNo">Phone No</label>
      <input type="text" name="phonNo" value={data.phonNo} onChange={changeHandler} />
      {errors.phonNo && <p style={{ color: "red" }}>{errors.phonNo}</p>}
      <br />

      <label htmlFor="password">Password</label>
      <input type="password" name="password" value={data.password} onChange={changeHandler} />
      {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      <br />

      <label htmlFor="confirmPass">Confirm Password</label>
      <input type="password" name="confirmPass" value={data.confirmPass} onChange={changeHandler} />
      {errors.confirmPass && <p style={{ color: "red" }}>{errors.confirmPass}</p>}
      <br />

      <label htmlFor="age">Age</label>
      <input type="number" name="age" value={data.age} onChange={changeHandler} />
      {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}
      <br />

      <label>Gender</label><br />
      <input type="radio" name="gender" value="Male" onChange={changeHandler} checked={data.gender === "Male"} /> Male
      <input type="radio" name="gender" value="Female" onChange={changeHandler} checked={data.gender === "Female"} /> Female
      <input type="radio" name="gender" value="Other" onChange={changeHandler} checked={data.gender === "Other"} /> Other
      {errors.gender && <p style={{ color: "red" }}>{errors.gender}</p>}
      <br />

      <label>Interests</label><br />
      <input type="checkbox" name="intrest" value="Coding" onChange={changeHandler} checked={data.intrest.includes("Coding")} /> Coding
      <input type="checkbox" name="intrest" value="Music" onChange={changeHandler} checked={data.intrest.includes("Music")} /> Music
      <input type="checkbox" name="intrest" value="Sports" onChange={changeHandler} checked={data.intrest.includes("Sports")} /> Sports
      {errors.intrest && <p style={{ color: "red" }}>{errors.intrest}</p>}
      <br />

      <label htmlFor="birthDate">Birth Date</label>
      <input type="date" name="birthDate" value={data.birthDate} onChange={changeHandler} />
      {errors.birthDate && <p style={{ color: "red" }}>{errors.birthDate}</p>}
      <br /><br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
