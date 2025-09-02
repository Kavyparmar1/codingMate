import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ✅ Fetch todos when component loads
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/todo/read", {
        withCredentials: true,
      });
      setTodos(res.data.todo); // backend se array mil raha hoga
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to load todos");
    }
  };

  const submitHandler = async (data) => {
    const todo = {
      title: data.title,
      description: data.description,
      imp: data.imp,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/todo/create",
        todo,
        { withCredentials: true }
      );

      if (response.status === 201 || response.status === 200) {
        alert(response.data.message);
        // ✅ After create, fetch updated todos list
        fetchTodos();
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
    reset();
  };
 const deletHandler = async (id)=>{
  const deletApi = await axios.delete(`http://localhost:3000/api/todo/delete/${id}`, {
    withCredentials: true
  });

  
  if (deletApi.status === 200) {
    alert(deletApi.data.message);
    fetchTodos();
  }
 }
  return (
    <div className="h-screen w-full bg-white flex items-center justify-between">
      <div className="h-full w-[40vw]">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex mt-10 flex-col items-center justify-center"
        >
          <input
            {...register("title", { required: true })}
            placeholder="Enter a todo"
            type="text"
            className="border-2 text-[#8E414F] h-10 w-[70%] m-5 outline-pink-300 border-[#8E414F] p-2 rounded-md"
          />
          {errors.title && <span className="text-red-500">Title required</span>}

          <textarea
            {...register("description")}
            placeholder="Enter a description"
            className="border-2 text-[#8E414F] h-20 w-[70%] m-5 outline-pink-300 border-[#8E414F] p-2 rounded-md"
          />

          <div className="flex items-center">
            <span className="text-red-600">Imp</span>
            <input
              {...register("imp")}
              className="rounded-full text-[#8E414F] m-5 outline-pink-300 border-[#8E414F] w-10 h-5"
              type="checkbox"
            />
          </div>

          <button className="bg-[#8E414F] text-white h-10 m-5 w-20 rounded-md">
            Submit
          </button>
        </form>
      </div>

      <div className="h-full w-[50vw] p-10">
        <h2 className="text-2xl font-bold mb-4">Todos</h2>
        {todos.length === 0 && <p>No todos found</p>}
        {todos.map((t, i) => (
          <div key={i} className="border relative flex flex-col justify-center  p-5 mb-2 rounded-md">
            <h3 className="font-semibold">{t.title}</h3>
            <p>{t.description}</p>
            {t.imp && <span className="text-red-600">Important</span>}
            <button onClick={()=>{deletHandler(t._id)}} className="bg-red-600 absolute right-5 text-white h-8 px-2 rounded-md">
              Delete
            </button>
          </div>
        
       ))}
      </div>
    </div>
  );
};

export default Todo;
