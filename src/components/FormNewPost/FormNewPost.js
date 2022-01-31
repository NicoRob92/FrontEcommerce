import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { create_post } from "../../ducks/actions/actionCreators";
import FormProductDetail from "./FormProductDetail";
import FormProductDescription from "./FormProductDescription";
import Confirm from "./Confirm";
import Success from "./Success";
import validate from "./Validation";

export default function FormNewPost() {
  const dispatch = useDispatch()
  const UserId = localStorage.getItem("userId");
  const Token = localStorage.getItem("token");
  console.log(Token);
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState({})
  const [input, setInput] = useState({
    name: "",
    Categories: [],
    status: false,
    stock: 0,
    Images: [],
    description: "",
    price: "",
    UserId:UserId,
  });

  // Proceed to next step
  const nextStep = () => {
    setStep(step + 1)
  };

  // Go to previous step
  const prevStep = () => {
    setStep(step - 1)
  };

  // Handle field changes
  const handleChange = (e) => {
    setInput((input) => {
      const { name, value } = e.target
      if(name === 'Categories'){
        return{
          ...input,
          [name]: [...input.Categories,Number(value)]
        }
      }
      if(name === 'Images'){
        return{
          ...input,
          [name]: [...input.Images,value]
        }
      }
      if(name === 'price'){
        return{
          ...input,
          [name]:Number(value)
        }
      }
      return {
        ...input,
        [name]: value,
      }
    })
  }

  // Handle errors by blur event
  const handleBlur = () => {
    setErrors(validate(input));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(create_post(input,Token))
    setInput({
      name: "",
      Categories: [],
      status: false,
      stock: 0,
      Images: [],
      description: "",
      price: "",
    });
  };

  switch (step) {
    case 1:
      return (
        <FormProductDetail
          nextStep={nextStep}
          handleChange={handleChange}
          handleBlur={handleBlur}
          input={input}
        />
      );
    case 2:
      return (
        <FormProductDescription
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          handleBlur={handleBlur}
          input={input}
        />
      );
    case 3:
      return (
        <Confirm
          nextStep={nextStep}
          prevStep={prevStep}
          input={input}
          handleSubmit={handleSubmit}
        />
      );
    case 4:
      return <Success />;
    default:
      return null;
  }
}
