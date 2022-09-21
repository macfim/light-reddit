import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { SpinnerCircular } from "spinners-react";
import { useState } from "react";

import { getComments } from "../../../Slices/postsSlice";
import CommentsList from "./CommentsList";

const Comments = ({
  id,
  permalink,
  comments,
  commentsStatus,
  commentsError,
}) => {
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(true);

  const handleClick = () => {
    dispatch(getComments({ id, permalink }));
  };

  const CommentsWrapper = styled.div`
    margin-inline: -1rem;
    cursor: default;
  `;

  const Button = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    border-radius: 15px 15px 0 0;
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
    padding-bottom: 1rem;
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
        <CommentsList comments={comments} />
      ) : null}
      {commentsStatus === "failed" ? <h2>{commentsError}</h2> : null}
    </CommentsWrapper>
  );
};

export default Comments;
