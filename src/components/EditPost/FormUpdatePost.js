import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormProductDetail from "./FormProductDetail";
import FormProductDescription from "./FormProductDescription";
import Confirm from "./Confirm";
import Success from "./Success";
import validate from "./Validation";
import {getPostByIdUrl,getCategoriesUrl,api}  from '../../ducks/actions/actionCreators'

import { useParams,Redirect } from "react-router-dom";


function updatePost(post) {
  async function putData(url = "", data = {}) {

    const response = await fetch(url, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem("token")


      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return response.json();
  }
  putData(api+"admin/post", post)
    .then((json) => {
      alert(json.msg);
    })
    .catch((err) => console.log("server response error", err));
}

export default function FormUpdatePost() {
  const { id } = useParams();
  let [allCategories,setAllCategories] = useState([]);
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
  });
  let dispatch = useDispatch();
  useEffect(() => {

    async function fetchData() {
      // You can await here
      // ...
      let data = await fetch(getPostByIdUrl+"/"+id).then(res=>res.json())
      let allCategories = await fetch(getCategoriesUrl).then(res=>res.json())
      setAllCategories(allCategories)
      if(data.User.username!=localStorage.getItem("username")){
        setStep(0)
      }
      setInput({
       ...data,
       title: data.name,
       Images: data.Images.map(i=>i.link),
       Categories:data.Categories.map(c=>c.id.toString())

     })

    }
    fetchData()

    }, [])

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
      return {
        ...input,
        [name]: value,
      };
    });
  };
  const deleteMultiOption = (name, value) => {
    console.log(value);
    setInput((input) => {
      return {
        ...input,
        [name]: input[name].filter((e) => e != value),
      };
    });
  };
  // Handle multioptio like images or categories
  const handleMultiOption = (e) => {
    setInput((input) => {
      const { name, value } = e.target;
      return {
        ...input,
        [name]: [...input[name], value],
      };
    });
  };
  const addImage = (link) => {
    setInput({
      ...input,
      Images: [...input.Images, link],
    });
  };

  // Handle errors by blur event
  const handleBlur = () => {
    setErrors(validate(input));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePost({ ...input, name: input.title }));
  };

  switch (step) {
    case 0:
      return(

        <Redirect to={"/detail/"+id}/>
      )

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
