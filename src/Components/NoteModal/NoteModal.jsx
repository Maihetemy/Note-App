/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import style from "./NoteModal.module.css";
import { Formik, useFormik } from "formik";
import { TokenContext } from "./../../Context/TokenContext";
import useAddNote from "../../Hooks/AddNoteHook";
import * as Yup from "yup";
import { RiLoader5Fill } from "react-icons/ri";

export default function NoteModal({ setNotesList, notesList }) {
  const { token } = useContext(TokenContext);
  const {
    mutate: addNote,
    data: addNoteData,
    isPending: isAdding,
    error: addNoteError,
    isLoading: isAddLoading,
  } = useAddNote(token);

  const addNoteFn = (note) => {
    addNote(note, {
      onSuccess: (addNoteData) => {
        console.log(addNoteData);
        if (addNoteData.msg === "done") {
          setNotesList((oldState) => [...oldState, addNoteData.note]);
          console.log(notesList);
        }
      },
    });
  };
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required!"),
    content: Yup.string().required("Title is required!"),
  });
  let form = useFormik({
    initialValues: { title: "", content: "" },
    onSubmit: (values, { resetForm }) => {
      addNoteFn(values);
      resetForm();
    },
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
  });
  return (
    <>
      <div className="w-min ">
        {/* Modal toggle */}
        <button
          data-modal-target="default-modal"
          data-modal-toggle="default-modal"
          className="capitalize cursor-pointer block text-nowrap text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          add button
        </button>
        {/* Main modal */}
        <div
          id="default-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="capitalize text-xl font-semibold text-gray-900 dark:text-white">
                  add a new note!
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="default-modal"
                  onClick={form.resetForm}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <form
                onSubmit={form.handleSubmit}
                className="space-y-4 text-start"
              >
                <div className="p-4 md:p-5 ">
                  <div className="mb-5 flex justify-center items-center">
                    <label
                      htmlFor="title"
                      className="capitalize w-2/12 block mr-2 text-md font-medium text-gray-900 dark:text-white"
                    >
                      title
                    </label>
                    <input
                      name="title"
                      value={form.values.title}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      type="text"
                      id="title"
                      className="bg-gray-50 w-10/12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  {form.touched.title && form.errors.title && (
                    <div
                      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      {form.errors.title}
                    </div>
                  )}
                  <div className="mb-5 flex justify-center items-center">
                    <label
                      htmlFor="content"
                      className="capitalize w-2/12  block mr-2 text-md font-medium text-gray-900 dark:text-white"
                    >
                      content
                    </label>
                    <textarea
                      name="content"
                      value={form.values.content}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      id="content"
                      className="w-10/12 h-[120px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  {form.touched.content && form.errors.content && (
                    <div
                      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      {form.errors.content}
                    </div>
                  )}
                </div>

                {/* Modal footer */}
                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    disabled={!(form.dirty && form.isValid) || isAddLoading}
                    data-modal-hide="default-modal"
                    type="submit"
                    className="disabled:cursor-not-allowed disabled:opacity-70 capitalize text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {isAdding ? (
                      <RiLoader5Fill className="animate-spin text-xl " />
                    ) : (
                      "add note"
                    )}
                  </button>
                  <button
                    data-modal-hide="default-modal"
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    onClick={form.resetForm}
                  >
                    close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
