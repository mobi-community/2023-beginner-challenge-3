import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CommonPageNation from "../components/pagenation/Pagenation";
import { commentsApi, postDetailApi } from "../apis/axios";

const LIMIT_TAKE = 20;
const PostDetailPage = () => {
  const [params] = useSearchParams();
  const [postDetail, setPostDetail] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [isOpenCommentList, setIsOpenCommentList] = useState(false);

  const fetchPostDetail = async () => {
    const response = await postDetailApi();
    setPostDetail(response.data);
  };

  const fetchComments = async () => {
    const response = await commentsApi(params, LIMIT_TAKE);
    setCommentList(response.data.Comments);
  };

  const onClickMoreComments = async () => {
    setIsOpenCommentList(true);
    fetchComments();
  };

  const onClickHiddenComments = () => {
    setIsOpenCommentList(false);
  };

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (!userName) {
      alert("로그인이 필요합니다");
      window.location.href = "/";
    }
    fetchPostDetail();
  }, []);

  useEffect(() => {
    if (!isOpenCommentList) return;
    fetchComments();
  }, [params]);

  return (
    <div>
      <h1>Post Detail Page</h1>
      <div>
        <p>제목: {postDetail.title}</p>
        <p>내용: {postDetail.content}</p>
        {!isOpenCommentList && (
          <button onClick={onClickMoreComments}>댓글 보기</button>
        )}
        {isOpenCommentList && (
          <button onClick={onClickHiddenComments}>댓글 숨기기</button>
        )}
        {isOpenCommentList && (
          <>
            {commentList.map((comment) => (
              <div key={comment.id}>
                <p>{comment.content}</p>
                <p>{comment.User.nickName}</p>
              </div>
            ))}
            <CommonPageNation URLendPoint="comments" />
          </>
        )}
      </div>
    </div>
  );
};
export default PostDetailPage;
