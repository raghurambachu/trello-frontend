import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext } from "react";
import BoardContext from "../../context/BoardContext";
import UserContext from "../../context/UserContext";

function validateCommentForm() {
  return Yup.object({
    comment: Yup.string()
      .min(2, "Must be 2 characters or more")
      .max(150, "Must be 150 characters or less")
      .required("Required"),
  });
}

function handleSubmit(
  values,
  actions,
  boardId,
  cardId,
  setComments,
  userState
) {
  let comment = {
    body: values.comment,
    cardId,
  };
  const { _id, name } = userState?.user;
  axios
    .post(`${process.env.REACT_APP_BASE_URL}/comments/${boardId}`, { comment })
    .then((res) => {
      console.log(res?.data?.comment);
      if (res?.data?.comment) {
        let commentRes = res.data.comment;
        commentRes = { ...commentRes, author: { _id, name } };
        setComments((ps) => [commentRes, ...ps]);
      } else {
        console.log(res);
      }
    })
    .catch((err) => console.log(err))
    .finally(() => {
      actions.resetForm();
      actions.setSubmitting(false);
    });
}

function CreateComment(props) {
  const { boardState } = useContext(BoardContext);
  const { state: userState } = useContext(UserContext);
  return (
    <>
      <Formik
        validationSchema={validateCommentForm}
        initialValues={{ comment: "" }}
        onSubmit={(values, actions) =>
          handleSubmit(
            values,
            actions,
            boardState.boardId,
            props.cardId,
            props.setComments,
            userState
          )
        }
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <textarea
              name="comment"
              id="comment"
              {...formik.getFieldProps("comment")}
              className="block w-full h-10 p-1 border rounded-md resize-none focus:outline-none"
            ></textarea>
            <button
              type="submit"
              className={`px-2 py-1 mt-2 text-gray-100 bg-gray-500 rounded     
              `}
            >
              Save
            </button>
          </form>
        )}
      </Formik>
    </>
  );
}

export default CreateComment;
