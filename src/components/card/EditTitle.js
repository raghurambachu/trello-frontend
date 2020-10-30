import React, { useContext } from "react";
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
  boardId,
  setEditTitle,
  cardContent,
  dispatchBoard,
  setTitle
) {
  let card = { name: values.name, id: cardContent?._id };
  axios
    .put(`${process.env.REACT_APP_BASE_URL}/cards/${boardId}`, { card })
    .then((res) => {
      if (res?.data?.card?._id) {
        dispatchBoard({ type: "modify-card", value: res?.data?.card });
        setTitle(values.name);
        setEditTitle(false);
      } else {
        setEditTitle(false);
        console.log("Error", res?.data);
      }

      // todo need to take care of error that comes in res.data.list
    })
    .catch((err) => {
      actions.resetForm();
      setEditTitle(false);
    });
}

function EditTitle(props) {
  const { card, setEditTitle, title, setTitle } = props;

  const { boardState, dispatchBoard } = useContext(BoardContext);
  return (
    <Formik
      validationSchema={validateCardForm}
      onSubmit={(values, actions) =>
        handleSubmit(
          values,
          actions,
          boardState.boardId,
          props.setEditTitle,
          card,
          dispatchBoard,
          setTitle
        )
      }
      initialValues={{ name: title }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit} onBlur={() => setEditTitle(false)}>
          <input
            type="text"
            name="name"
            id="name"
            {...formik.getFieldProps("name")}
            className="block px-2 py-1 border-2 w-80"
          />
          {formik.touched.name && formik.errors.name ? (
            <small className="text-red-500">{formik.errors.name}</small>
          ) : null}
        </form>
      )}
    </Formik>
  );
}

export default EditTitle;
