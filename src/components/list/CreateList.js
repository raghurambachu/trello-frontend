import React from "react";
import { Formik } from "formik";
import { FaTimes } from "react-icons/fa";
import * as Yup from "yup";
import axios from "axios";
import { useContext } from "react";
import BoardContext from "../../context/BoardContext";

function validateListForm() {
  return Yup.object({
    name: Yup.string()
      .min(2, "Must be 2 characters or more")
      .max(25, "Must be 25 characters or less")
      .required("Required"),
  });
}

function handleSubmit(values, actions, boardId, dispatchBoard, setAddList) {
  const list = { name: values.name, boardId };
  axios
    .post(`${process.env.REACT_APP_BASE_URL}/lists`, { list })
    .then((res) => {
      if (res?.data?.list?._id) {
        actions.setSubmitting(false);
        dispatchBoard({ type: "add-list", value: res?.data?.list });
        setAddList(false);
      } else {
        actions.setSubmitting(false);
        setAddList(false);
        console.log("Duplicate/Error");
      }

      // todo need to take care of error that comes in res.data.list
    })
    .catch((err) => {
      actions.setSubmitting(false);
      actions.resetForm();
      setAddList(false);
    });
}

function CreateList(props) {
  const { dispatchBoard } = useContext(BoardContext);
  return (
    <div className="transition duration-150 rounded-md add-list">
      <Formik
        validationSchema={validateListForm}
        initialValues={{ name: "" }}
        onSubmit={(values, actions) =>
          handleSubmit(
            values,
            actions,
            props.boardId,
            dispatchBoard,
            props.setAddList
          )
        }
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <input
              placeholder="Enter a title for this list."
              name="name"
              id="name"
              className="block w-full p-2 border-2 outline-none"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name ? (
              <small className="text-yellow-100">{formik.errors.name}</small>
            ) : null}
            <div className="flex items-center mt-3 add-list-footer">
              <button
                type="submit"
                className="px-2 py-1 mr-4 text-green-100 bg-green-500 rounded-sm cursor-pointer focus:outline-none "
              >
                Add list
              </button>
              <FaTimes
                className="text-gray-300 cursor-pointer focus:outline-none"
                onClick={() => props.setAddList(false)}
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default CreateList;
