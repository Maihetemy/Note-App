/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import style from "./Register.module.css";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [messages, setMessages] = useState({
    successfulMsg: "",
    errorMsg: "",
  });
  useEffect(() => {}, []);
  const navigate = useNavigate();
  // -----api function------
  const callRegisterApi = async (values) => {
    try {
      setMessages({
        successfulMsg: "",
        errorMsg: "",
      });

      const { data } = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/users/signUp",
        values
      );

      console.log(data);
      if (data?.msg === "done") {
        setMessages((oldState) => {
          return {
            ...oldState,
            successfulMsg: "Successful! Redirecting to Login page!",
          };
        });
        localStorage.setItem('NoteAppToken', data?.user._id);
      }

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setMessages((oldState) => {
        return { ...oldState, errorMsg: error.response.data.msg };
      });
    }
  };

  // -----formik schema------
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Your name is required..")
      .min(2, "Name is too Short"),
    email: Yup.string()
      .required("Your email is required..")
      .email("invalid Email"),
    password: Yup.string()
      .required("Your Password is required..")
      .min(8, "Your password must be at least 8 characters"),
    age: Yup.number()
      .required("Your age is required..")
      .moreThan(6, "Your must be older than 6"),
    phone: Yup.string()
      .required("Your phone is required..")
      .matches(
        /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/,
        "The phone number must be Egyption phone number"
      ),
  });

  // -----formik schema------
  const form = useFormik({
    initialValues: { name: "", email: "", password: "", age: "", phone: "" },
    onSubmit: callRegisterApi,
    validationSchema,
  });

  return (
    <>
      <div className="container my-5 mx-auto p-5 text-center">
        <h1 className="font-bold text-3xl mb-5 inline-block">Register!</h1>
        <div>
          {messages.successfulMsg && (
            <div
              className="capitalize w-full mx-auto md:w-1/2 py-2 px-4 mb-4  text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              {messages.successfulMsg}
            </div>
          )}
          {messages.errorMsg && (
            <div
              className="capitalize w-full mx-auto md:w-1/2 py-2 px-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {messages.errorMsg}
            </div>
          )}
        </div>

        <form
          onSubmit={form.handleSubmit}
          className="max-w-sm mx-auto text-left"
        >
          {/* Name */}
          <div className="nameInput">
            <div className="mb-3">
              <label
                htmlFor="name"
                className="capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your name
              </label>
              <input
                name="name"
                id="name"
                value={form.values.name}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                type="text"
                className="placeholder:capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name"
                required
              />
            </div>
            {form.errors.name && form.touched.name && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {form.errors.name}
              </div>
            )}
          </div>

          {/* Email */}
          <div className="emailInput">
            <div className="mb-3">
              <label
                htmlFor="email"
                className="capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                name="email"
                id="email"
                value={form.values.email}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                type="text"
                className="placeholder:capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="email"
                required
              />
            </div>
            {form.errors.email && form.touched.email && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {form.errors.email}
              </div>
            )}
          </div>

          {/* Password */}
          <div className="passwordInput">
            <div className="mb-3">
              <label
                htmlFor="password"
                className="capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                name="password"
                id="password"
                value={form.values.password}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                type="password"
                className="placeholder:capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="password"
                required
              />
            </div>
            {form.errors.password && form.touched.password && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {form.errors.password}
              </div>
            )}
          </div>

          {/* age */}
          <div className="ageInput">
            <div className="mb-3">
              <label
                htmlFor="age"
                className="capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your age
              </label>
              <input
                name="age"
                id="age"
                value={form.values.age}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                type="number"
                className="placeholder:capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="age"
                required
              />
            </div>
            {form.errors.age && form.touched.age && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {form.errors.age}
              </div>
            )}
          </div>

          {/* phone */}
          <div className="phoneInput">
            <div className="mb-3">
              <label
                htmlFor="phone"
                className="capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your phone
              </label>
              <input
                name="phone"
                id="phone"
                value={form.values.phone}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                type="text"
                className="placeholder:capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="phone"
                required
              />
            </div>
            {form.errors.phone && form.touched.phone && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {form.errors.phone}
              </div>
            )}
          </div>

          {/* Submit button */}
          <button
            disabled={!(form.dirty && form.isValid)}
            type="submit"
            className="me-3 disabled:opacity-70 disabled:cursor-not-allowed my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>

          {/* reset button */}
          <button
            onClick={form.resetForm}
            type="reset"
            className="my-2 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Reset
          </button>
          <p className="text-sm inline-block ms-3">You have an account? <span className="font-semibold cursor-pointer" onClick={()=> navigate('/login')}>Login</span></p>
        </form>
      </div>
    </>
  );
}
