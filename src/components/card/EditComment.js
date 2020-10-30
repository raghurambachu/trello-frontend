import React, { useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import BoardContext from "../../context/BoardContext";
import UserContext from "../../context/UserContext";

function validateCommentEditForm() {
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
  commentId,
  setComments,
  userState,
  setEditComment
) {
  const comment = {
    body: values.comment,
  };
  const { _id, name } = userState?.user;
  axios
    .put(
      `${process.env.REACT_APP_BASE_URL}/comments/${boardId}/comment/${commentId}`,
      { comment }
    )
    .then((res) => {
      if (res?.data?.comment?._id) {
        let commentRes = res.data.comment;
        setComments((ps) => {
          return ps.map((comment) => {
            if (comment._id === commentId) {
              return { ...commentRes, author: { _id, name } };
            }
            return comment;
          });
        });
      } else {
        console.log(res);
      }
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setEditComment(false);
      actions.setSubmitting(false);
    });
}

function EditComment(props) {
  const { boardState } = useContext(BoardContext);
  const { state: userState } = useContext(UserContext);
  return (
    <div className="edit-comment">
      <Formik
        validationSchema={validateCommentEditForm}
        initialValues={{ comment: props.body }}
        onSubmit={(values, actions) =>
          handleSubmit(
            values,
            actions,
            boardState.boardId,
            props.commentId,
            props.setComments,
            userState,
            props.setEditComment
          )
        }
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <textarea
              className="block w-full border-2 resize-none focus:outline-none"
              name="comment"
              id="comment"
              {...formik.getFieldProps("comment")}
            ></textarea>
            {formik.touched.comment && formik.errors.comment ? (
              <small className="text-yellow-100">{formik.errors.comment}</small>
            ) : null}
            <button
              className={`px-2 py-1 my-2 text-gray-100 bg-gray-500  ${
                formik.isSubmitting ? "cursor-not-allowed" : ""
              }`}
              type="submit"
            >
              {formik.isSubmitting ? "Editing" : " Edit Comment"}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default EditComment;
