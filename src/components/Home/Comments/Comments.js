import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { SpinnerCircular } from "spinners-react";
import { useState } from "react";

import { getComments } from "../../../sl1ces/postsSlice";
import CommentsList from "./CommentsList";

const Comments = ({
  id,
  permalink,
  comments,
  commentsStatus,
  commentsError,
  commentsShowLength,
}) => {
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(true);

  const handleClick = () => {
    dispatch(getComments({ id, permalink }));
  };

  const CommentsWrapper = styled.div`
    margin-inline: -1rem;
    cursor: default;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
  `;

  const Button = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0.5rem;
    cursor: pointer;

    @media (hover: hover) {
      :hover {
        background: rgba(0, 0, 0, 0.05);
      }
    }
  `;

  const Loading = styled.div`
    display: flex;
    justify-content: center;
    padding: 0.2rem;
  `;

  return (
    <CommentsWrapper>
      {commentsStatus === null || !showComments ? (
        <Button onClick={handleClick}>show comments</Button>
      ) : null}
      {commentsStatus === "success" && showComments ? (
        <Button onClick={(o) => setShowComments((prev) => !prev)}>
          hide comments
        </Button>
      ) : null}
      {commentsStatus === "loading" ? (
        <Loading>
          <SpinnerCircular size="2rem" color="black" secondaryColor="white" />
        </Loading>
      ) : null}
      {commentsStatus === "success" && showComments ? (
        <CommentsList
          comments={comments}
          commentsShowLength={commentsShowLength}
          id={id}
        />
      ) : null}
      {commentsStatus === "failed" ? <h2>{commentsError}</h2> : null}
    </CommentsWrapper>
  );
};

export default Comments;
