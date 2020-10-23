import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

function validateListForm() {
  return Yup.object({
    description: Yup.string()
      .min(2, "Must be 2 characters or more")
      .max(150, "Must be 25 characters or less")
      .required("Required"),
  });
}

function handleSubmit(
  values,
  actions,
  boardId,
  setEditDesc,
  cardContent,
  setCardContent
) {
  let card = { description: values.description, id: cardContent?.card?._id };

  axios
    .put(`${process.env.REACT_APP_BASE_URL}/cards/${boardId}`, { card })
    .then((res) => {
      if (res?.data?.card?._id) {
        actions.setSubmitting(false);
        setCardContent((ps) => ({ ...ps, card: res?.data?.card }));
        setEditDesc(false);
      } else {
        actions.setSubmitting(false);
        setEditDesc(false);
        console.log("Error", res?.data);
      }

      // todo need to take care of error that comes in res.data.list
    })
    .catch((err) => {
      actions.setSubmitting(false);
      actions.resetForm();
      setEditDesc(false);
    });
}

function CreateDescription(props) {
  return (
    <Formik
      validationSchema={validateListForm}
      initialValues={{ description: props.cardContent.description }}
      onSubmit={(values, actions) =>
        handleSubmit(
          values,
          actions,
          props.boardId,
          props.setEditDesc,
          props.cardContent,
          props.setCardContent
        )
      }
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <textarea
            className="block w-full h-16 p-1 mt-4 border-2 border-gray-800 resize-none"
            name="description"
            id="description"
            {...formik.getFieldProps("description")}
          ></textarea>

          <div className="flex items-center space-x-6">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className={`px-2 py-1 mt-2 text-green-100 bg-green-400 rounded ${
                formik.isSubmitting ? "cursor-not-allowed" : ""
              }`}
            >
              {formik.isSubmitting ? "Saving..." : "Save"}
            </button>

            <FaTimes
              size={24}
              className="mt-1 cursor-pointer focus:outline-none"
              onClick={() => props.setEditDesc(false)}
            />
          </div>
          {formik.touched.description && formik.errors.description ? (
            <small className="block text-red-400">
              {formik.errors.description}
            </small>
          ) : null}
        </form>
      )}
    </Formik>
  );
}

// () => props.setEditDesc(false)

export default CreateDescription;
