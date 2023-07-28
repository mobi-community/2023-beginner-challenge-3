import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DialLogState, useDiaLogStore } from '../contexts/DialogProvider';
import PagiNation from '../components/pagenation/Pagination';
import { fetching } from '../util/utility';
import CheckLogin from '../hooks/CheckLogin';

const LIMIT_PAGE = 10;
const LIMIT_TAKE = 10;

const PostListPage = () => {
  const [params] = useSearchParams();
  const [postList, setPostList] = useState([]);
  const [_, dispatch] = useDiaLogStore();

  const fetchPostList = async () => {
    const address = '/api/posts';
    const option = {
      params: {
        page: params.get('page') ?? 1,
        take: params.get('take') ?? LIMIT_TAKE,
        limit: params.get('limit') ?? LIMIT_PAGE,
      },
    };
    const res = await fetching(address, option);
    setPostList(res);
  };

  useEffect(() => {
    CheckLogin();
  }, []);

  useEffect(() => {
    fetchPostList();
  }, [params]);

  const onClickPost = (postId) => {
    dispatch({
      type: DialLogState.CONFIRM,
      payload: {
        text: '페이지를 이동하겠습니까',
        isOpen: true,
        onConfirm: async () => {
          await dispatch({
            type: DialLogState.DOUBLE_CHECK,
            payload: {
              text: '정말로 이동해버린다요!',
              onConfirm: async () => {
                window.location.href = `/post-detail/${postId}`;
              },
            },
          });
        },
        onCancel: () => {
          dispatch({ type: DialLogState.CLOSE });
        },
      },
    });
  };

  return (
    <table>
      <caption>Post List Page</caption>
      <tr>
        <th>제목</th>
        <th>내용</th>
        <th>작성자</th>
      </tr>
      {postList.Posts?.map((post) => (
        <tr key={post.id} onClick={() => onClickPost(post.id)}>
          <td>{post.title}</td>
          <td>{post.content}</td>
          <td>{post.User.nickName}</td>
        </tr>
      ))}
      {postList.PageNation && <PagiNation data={postList.PageNation} />}
    </table>
  );
};
export default PostListPage;
