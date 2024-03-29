import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormProductDetail from "./FormProductDetail";
import FormProductDescription from "./FormProductDescription";
import Confirm from "./Confirm";
import Success from "./Success";
import validate from "./Validation";
import {getPostByIdUrl,getCategoriesUrl}  from '../../ducks/actions/actionCreators'
import {api} from '../../credentials'

import { useParams,Redirect } from "react-router-dom";

function removePost(id) {
  fetch(api+"admin/post/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "token": localStorage.getItem("token")
    }
  })
    .then((res) => res.text()) // or res.json()
    .then((res) => alert(res.msg));
}


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
  const [deletion , setdeletion]= useState()
  let dispatch = useDispatch();
  useEffect(() => {

    async function fetchData() {
      // You can await here
      // ...
      let data = await fetch(getPostByIdUrl+"/"+id).then(res=>res.json())
      let allCategories = await fetch(getCategoriesUrl).then(res=>res.json())
      setAllCategories(allCategories)
      if(data.User.username!=localStorage.getItem("username")&& "user"==localStorage.getItem("rol")){
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

    dispatch(updatePost({ ...input, name: input.title }));


  };
  function deletePost() {
    setdeletion(true)
    setStep(4)
    removePost(id)
  }

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
          errors={errors}
          deletePost={deletePost}
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
      return <Success id={id} deletion={deletion} errors={errors} />;
    default:
      return null;
  }
}
