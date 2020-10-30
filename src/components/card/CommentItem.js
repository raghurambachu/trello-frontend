import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import BoardContext from "../../context/BoardContext";
import CardContext from "../../context/CardContext";
import EditComment from "./EditComment";
import UserContext from "../../context/UserContext";

function handleDelete(commentId, cardId, boardId, setComments) {
  axios
    .delete(
      `${process.env.REACT_APP_BASE_URL}/comments/${boardId}/card/${cardId}/comment/${commentId}`
    )
    .then((res) => {
      if (res?.data?.msg?._id) {
        setComments((ps) => {
          return ps.filter((comment) => comment._id !== commentId);
        });
      } else {
        console.log("Error");
      }
    })
    .catch((err) => console.log(err));
}

function CommentItem(props) {
  let { comment } = props;
  const { card, setComments } = useContext(CardContext);
  const { boardState } = useContext(BoardContext);
  const { state: userState } = useContext(UserContext);
  const [editComment, setEditComment] = useState(false);
  const isCommentOwner = userState?.user?._id === comment?.author?._id;

  return (
    <li className="flex space-x-4">
      <div
        className={
          !editComment ? "flex items-center m-1 space-x-4" : "m-1 w-full"
        }
      >
        {!editComment ? (
          <>
            <span className="flex items-center justify-center w-10 h-10 text-green-100 bg-green-500 rounded-full ">
              {comment?.author?.name
                .split(" ")
                .map((word) => word[0].toUpperCase())
                .join("")}
            </span>

            <span className="inline-block px-2 py-2 bg-white rounded shadow-md">
              {comment?.body}
            </span>
          </>
        ) : (
          <EditComment
            setComments={setComments}
            body={comment.body}
            setEditComment={setEditComment}
            commentId={comment._id}
          />
        )}
      </div>
      {!editComment && isCommentOwner && (
        <div className="self-end space-x-2 text-sm">
          <span
            onClick={() => setEditComment(true)}
            className="text-gray-700 underline cursor-pointer hover:text-gray-900"
          >
            Edit
          </span>
          <span
            onClick={() =>
              handleDelete(
                comment._id,
                card._id,
                boardState.boardId,
                setComments
              )
            }
            className="text-gray-700 underline cursor-pointer hover:text-gray-900"
          >
            Delete
          </span>
        </div>
      )}
    </li>
  );
}

export default CommentItem;
