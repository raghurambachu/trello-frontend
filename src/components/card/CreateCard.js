import React, { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import BoardContext from "../../context/BoardContext";

function validateCardForm() {
  return Yup.object({
    name: Yup.string()
      .min(2, "Must be 2 characters or more")
      .max(25, "Must be 25 characters or less")
      .required("Required"),
  });
}

function handleSubmit(
  values,
  actions,
  listId,
  boardId,
  dispatchBoard,
  dispatch
) {
  const card = { name: values.name, listId };
  axios
    .post(`${process.env.REACT_APP_BASE_URL}/cards/${boardId}/all`, { card })
    .then((res) => {
      if (res?.data?.card?._id) {
        actions.setSubmitting(false);
        dispatchBoard({ type: "add-card", value: res?.data?.card });
        dispatch({ type: "close-card" });
      } else {
        actions.setSubmitting(false);
        dispatch({ type: "close-card" });
        console.log("Duplicate/Error");
      }

      // todo need to take care of error that comes in res.data.list
    })
    .catch((err) => {
      actions.setSubmitting(false);
      actions.resetForm();
      dispatch({ type: "close-card" });
    });
}

function CreateCard(props) {
  const { dispatchBoard } = useContext(BoardContext);
  return (
    <div className="add-card">
      <Formik
        validationSchema={validateCardForm}
        initialValues={{ name: "" }}
        onSubmit={(values, actions) =>
          handleSubmit(
            values,
            actions,
            props.listId,
            props.boardId,
            dispatchBoard,
            props.dispatch
          )
        }
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <textarea
              placeholder="Enter a title for this card."
              name="name"
              id="name"
              {...formik.getFieldProps("name")}
              className="block w-full h-16 p-2 border-2 outline-none resize-none"
            ></textarea>
            {formik.touched.name && formik.errors.name ? (
              <small className="text-yellow-100">{formik.errors.name}</small>
            ) : null}
            <div className="flex items-center mt-3 add-card-footer">
              {/* <button
                type="submit"
                className="px-2 py-1 mr-4 text-green-100 bg-green-500 rounded-sm cursor-pointer focus:outline-none "
                onClick={() => props.dispatch({ type: "save-card" })}
              >
                Add Card
              </button> */}
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className={`px-2 py-1 mr-4 text-green-100 bg-green-500 rounded-sm cursor-pointer focus:outline-none ${
                  formik.isSubmitting ? "cursor-not-allowed" : ""
                }`}
              >
                {formik.isSubmitting ? "Creating card..." : "Create Card"}
              </button>
              <FaTimes
                className="cursor-pointer focus:outline-none"
                onClick={() => props.dispatch({ type: "close-card" })}
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default CreateCard;
