import { useEffect } from 'react'
import { PostApi } from '../../apis/post'
import { IsUserName } from '../../utils/isUserName'
import CommentList from './components/commentList'
import useFetch from '../../hooks/useFetch'
import useToggle from '../../hooks/useToggle'
import { useSearchParams } from 'react-router-dom'

const PostDetailPage = () => {
	const [params] = useSearchParams()

	const { isOpen: isOpenCommentList, onPressToggle } = useToggle()
	const isShownCommentBtn = isOpenCommentList ? '숨기기' : '보기'

	const { data: postDetail, loading } = useFetch(PostApi.getList, {
		target: 'post',
	})

	useEffect(() => {
		IsUserName()
	}, [])

	useEffect(() => {
		if (!isOpenCommentList) return
	}, [params, isOpenCommentList])

	if (loading) return <div>로딩중...</div>

	return (
		<div>
			<h1>Post Detail Page</h1>
			<div>
				<p>제목: {postDetail.title}</p>
				<p>내용: {postDetail.content}</p>
			</div>
			<button onClick={onPressToggle}>댓글 {isShownCommentBtn}</button>
			{isOpenCommentList && <CommentList />}
		</div>
	)
}
export default PostDetailPage
