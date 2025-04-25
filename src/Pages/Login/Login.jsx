/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [messages, setMessages] = useState({
    successfulMsg: "",
    errorMsg: "",
  });
  const navigate = useNavigate();
  useEffect(() => {}, []);
  const callLoginApi = async (values) => {
    setMessages({
      successfulMsg: "",
      errorMsg: "",
    });
    try {
      const { data } = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/users/signIn",
        values
      );
      if (data.msg === "done") {
        setMessages((oldState) => {
          return { ...oldState, successfulMsg: "Successful login! " };
        });
        navigate("/");
      }
    } catch (error) {
      setMessages((oldState) => {
        return { ...oldState, errorMsg: error.response.data.msg };
      });
      console.log(error);
    }
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required!")
      .email("Email is not exist!"),
    password: Yup.string()
      .required("Password is required!")
      .min(8, "password must be at least 8 characters"),
  });
  const form = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: callLoginApi,
    validationSchema,
  });
  return (
    <>
      <div className="container my-5 mx-auto p-5 text-center">
        <h1 className="font-bold text-3xl mb-5 inline-block">Login!</h1>
        <div>
          {messages.successfulMsg && (
            <div
              className="w-full mx-auto md:w-1/2 py-2 px-4 mb-4  text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              {messages.successfulMsg}
            </div>
          )}
          {messages.errorMsg && (
            <div
              className="w-full mx-auto md:w-1/2 py-2 px-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
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
        </form>
      </div>
    </>
  );
}
