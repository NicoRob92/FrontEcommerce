import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormProductDetail from "./FormProductDetail";
import FormProductDescription from "./FormProductDescription";
import Confirm from "./Confirm";
import Success from "./Success";
import validate from "./Validation";
import {getPostByIdUrl,getCategories,api,create_post}  from '../../ducks/actions/actionCreators'

import { useParams,Redirect } from "react-router-dom";



export default function FormNewPost() {
  const UserId = localStorage.getItem("userId");
  const Token = localStorage.getItem("token");

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    title: "",
    Categories: [],
    condition: "",
    stock: "",
    description: "",
    price: "",
    Images: [],
    UserId:UserId,
    status:false
  });

  const allCategories = useSelector((state) => state.reducer.categories)
  let dispatch = useDispatch();


  // Proceed to next step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Go to previous step
  const prevStep = () => {
    setStep(step - 1);
  };

  // Handle field changes
  const handleChange = (e) => {

    setInput((input) => {
      const { name, value } = e.target;
      setErrors(validate({
        ...input,
        [name]: value,
      }))
      return {
        ...input,
        [name]: value,
      };
    });
  };
  const deleteMultiOption = (name, value) => {
    console.log(value);
    setInput((input) => {
      let temInput= {
        ...input,
        [name]: input[name].filter((e) => e != value),
      }
      setErrors(validate(temInput))
      return temInput;
    });
  };
  // Handle multioptio like images or categories
  const handleMultiOption = (e) => {
    setInput((input) => {
      const { name, value } = e.target;
      let temInput = {
        ...input,
        [name]: [...input[name], value],
      }
      setErrors(validate(temInput))
      return temInput;
    });
  };
  const addImage = (link) => {

    let temInput = {
      ...input,
      Images: [...input.Images, link],
    }
    setErrors(validate(temInput))
    setInput(temInput);
  };

  // Handle errors by blur event
  const handleBlur = () => {
    setErrors(validate(input));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(create_post({ ...input, name: input.title },Token));


  };


  switch (step) {

    case 1:
      return (
        <FormProductDetail
          nextStep={nextStep}
          addImage={addImage}
          handleBlur={handleBlur}
          input={input}
          Images={input.Images}
          deleteMultiOption={deleteMultiOption}
          handleChange={handleChange}
          errors={errors}

        />
      );
    case 2:
      return (
        <FormProductDescription
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          handleMultiOption={handleMultiOption}
          deleteMultiOption={deleteMultiOption}
          handleBlur={handleBlur}
          input={input}
          allCategories={allCategories}
          errors={errors}
        />
      );
    case 3:
      return (
        <Confirm
          nextStep={nextStep}
          prevStep={prevStep}
          input={input}
          handleSubmit={handleSubmit}
          errors={errors}
          allCategories={allCategories}
        />
      );
    case 4:
      return <Success  />;
    default:
      return null;
  }
}
