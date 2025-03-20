import React from "react";
import { useForm } from "react-hook-form";

const AddhtmlForm = ({ data, setData, setShowCreateComponent }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { title, content, status } = data;

    const submitData = {
      title: title,
      content: content,
      status: status ? "C" : "P",
    };

    const resp = await fetch("http://localhost:9090/api/notes/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(submitData),
    });

    const respJson = await resp.json();

    setData((prev) => [respJson.data, ...prev]);
    setShowCreateComponent(false);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="flex flex-col  w-[60%]">
        <div className="mt-2">
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Title
          </label>
          <input
            type="text"
            {...register("title", { required: true })}
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Enter note title here"
            required
          />
        </div>

        <div className="mt-2">
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Content
          </label>
          <textarea
            id="first_name"
            {...register("content", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Enter note content here"
            required
          />
        </div>
      </div>

      <div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            {...register("status")}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600 "></div>
          <span className="ms-3 text-sm font-medium text-gray-900 ">
            Is Completed
          </span>
        </label>
      </div>

      <div className="w-[10%]">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center cursor-pointer"
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddhtmlForm;
