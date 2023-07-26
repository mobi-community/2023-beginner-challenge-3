import { useEffect, useState } from 'react'
import { PostApi } from '../../../apis/post'
import { useSearchParams } from 'react-router-dom'
import Pagination from '../../../components/pagination'
import { styled } from 'styled-components'

const LIMIT_TAKE = 20
const CommentList = () => {
	const [params] = useSearchParams()
	const [commentList, setCommentList] = useState([])
	const [isOpenCommentList, setIsOpenCommentList] = useState(false)

	// take 부분은 axiosInstance의 기본 params로 설정할 수 있을듯!
	const fetchComments = async () => {
		const response = await PostApi.getList({
			target: 'comments',
			params: {
				take: params.get('take') ?? LIMIT_TAKE,
			},
		})
		console.log(response.data)
		setCommentList(response.data.Comments)
	}

	useEffect(() => {
		if (!isOpenCommentList) return
		fetchComments()
	}, [params, isOpenCommentList])

	return (
		<>
			<button onClick={() => setIsOpenCommentList(prev => !prev)}>
				{isOpenCommentList ? '댓글 숨기기' : '댓글 보기'}
			</button>
			{isOpenCommentList && (
				<>
					{commentList.map(comment => (
						<S.Comment key={comment.id}>
							<p>
								<span>Content:</span> {comment.content}
							</p>
							<p>
								<span>User:</span> {comment.User.nickName}
							</p>
						</S.Comment>
					))}
					<Pagination target={'comments'} />
				</>
			)}
		</>
	)
}

export default CommentList

const Comment = styled.div`
	border-bottom: 1px solid lightgray;
	padding: 10px;
	span {
		font-weight: bold;
	}
`

const S = { Comment }
