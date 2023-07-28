import { useEffect, useState } from "react";
import {  useDiaLogStore } from "../contexts/DiaLogProvider";
import { useSearchParams } from "react-router-dom";
import CommonPageNation from "../components/pagenation/Pagenation";
import { postsApi } from "../apis/axios";
import { FetchApi } from "../customHook/useFetchApi";

const LIMIT_TAKE = 10;
const PostListPage = () => {
  const [params] = useSearchParams();
  const [postList, setPostList] = useState([]);
  const {dispatch} = useDiaLogStore();

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (!userName) {
      alert("로그인이 필요합니다");
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    FetchApi(postsApi, setPostList, params, "Posts", LIMIT_TAKE)
  }, [params]);

  const onClickPost = async (postId) => {
    dispatch({type: 'CONFIRM', payload: {
      text: "정말로 정말로 페이지를 이동하겠습니까",
      confirm : () => {
        dispatch({
          type : 'RE_CONFIRM',
          payload : {
            text : "정말로 이동해버린다용",
            urlEndPoint: `/post-detail/${postId}`,
          }
        })
      }
    }})
  };

  return (
    <table>
      <caption>Post List Page</caption>
      <tr>
        <th>제목</th>
        <th>내용</th>
        <th>작성자</th>
      </tr>
      {postList.map((post) => (
        <tr key={post.id} onClick={() => onClickPost(post.id)}>
          <td>{post.title}</td>
          <td>{post.content}</td>
          <td>{post.User.nickName}</td>
        </tr>
      ))}
      <CommonPageNation URLendPoint="posts"/>
    </table>
  );
};
export default PostListPage;
