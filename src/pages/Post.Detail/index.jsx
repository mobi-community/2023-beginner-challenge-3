import { useEffect, useState } from 'react'
import { PostApi } from '../../apis/post'
import { IsUserName } from '../../utils/isUserName'
import CommentList from './components/commentList'

const PostDetailPage = () => {
	const [postDetail, setPostDetail] = useState([])

	const fetchPostDetail = async () => {
		const response = await PostApi.getList({ target: 'post' })
		setPostDetail(response.data)
	}

	useEffect(() => {
		IsUserName()
		fetchPostDetail()
	}, [])

	return (
		<div>
			<h1>Post Detail Page</h1>
			<div>
				<p>제목: {postDetail.title}</p>
				<p>내용: {postDetail.content}</p>
			</div>
			<CommentList />
		</div>
	)
}
export default PostDetailPage
