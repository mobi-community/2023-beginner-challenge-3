import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PagiNation from '../components/pagenation/Pagination';
import { fetching } from '../util/utility';
import CheckLogin from '../hooks/CheckLogin';

const LIMIT_PAGE = 10;
const LIMIT_TAKE = 20;

const PostDetailPage = () => {
  const [params] = useSearchParams();
  const [postDetail, setPostDetail] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [isOpenCommentList, setIsOpenCommentList] = useState(false);

  const fetchPostDetail = async () => {
    const address = '/api/post';
    const res = await fetching(address);
    setPostDetail(res);
  };

  const fetchComments = async () => {
    const address = '/api/comments';
    const option = {
      params: {
        page: params.get('page') ?? 1,
        take: params.get('take') ?? LIMIT_TAKE,
        limit: params.get('limit') ?? LIMIT_PAGE,
      },
    };
    const res = await fetching(address, option);
    setCommentList(res);
  };

  const onClickComments = async () => {
    setIsOpenCommentList((prev) => !prev);
  };

  useEffect(() => {
    CheckLogin();
    fetchPostDetail();
  }, [params]);

  useEffect(() => {
    fetchComments();
  }, [params]);

  return (
    <div>
      <h1>Post Detail Page</h1>
      <div>
        <p>제목: {postDetail.title}</p>
        <p>내용: {postDetail.content}</p>
        <button onClick={onClickComments}>
          {isOpenCommentList ? '댓글 숨기기' : '댓글 보기'}
        </button>
        {isOpenCommentList && (
          <>
            {commentList.Comments?.map((comment) => (
              <div key={comment.id}>
                <p>{comment.content}</p>
                <p>{comment.User.nickName}</p>
              </div>
            ))}
            {commentList.PageNation && (
              <PagiNation data={commentList.PageNation} />
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default PostDetailPage;
