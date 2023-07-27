import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CommonPageNation from "../components/pagenation/Pagenation";
import { commentsApi, postDetailApi } from "../apis/axios";
import useToggleChange from "../customHook/useToggleChange";
import { FetchApi } from "../customHook/useFetchApi";

const LIMIT_TAKE = 20;
const PostDetailPage = () => {
  const [params] = useSearchParams();
  const [postDetail, setPostDetail] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const { isToggle: isOpenCommentList, toggleChange } = useToggleChange()

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (!userName) {
      alert("로그인이 필요합니다");
      window.location.href = "/";
    }
    FetchApi(postDetailApi, setPostDetail);
  }, []);

  useEffect(() => {
    if (!isOpenCommentList) return;
    FetchApi(commentsApi, setCommentList, params, "Comments", LIMIT_TAKE);
  }, [isOpenCommentList, params]);

  return (
    <div>
      <h1>Post Detail Page</h1>
      <div>
        <p>제목: {postDetail.title}</p>
        <p>내용: {postDetail.content}</p>
        {!isOpenCommentList && (
          <button onClick={toggleChange}>댓글 보기</button>
        )}
        {isOpenCommentList && (
          <button onClick={toggleChange}>댓글 숨기기</button>
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
