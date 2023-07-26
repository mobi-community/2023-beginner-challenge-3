import { PostApi } from '../../../apis/post'
import { useSearchParams } from 'react-router-dom'
import Pagination from '../../../components/pagination'
import { styled } from 'styled-components'
import useFetch from '../../../hooks/useFetch'

const LIMIT_TAKE = 20
const CommentList = () => {
	const [params] = useSearchParams()
	const { data: commentResponse, loading } = useFetch(PostApi.getList, {
		target: 'comments',
		params: { take: params.get('take') ?? LIMIT_TAKE },
	})
	const commentList = commentResponse?.Comments

	if (loading) return <div>로딩중...</div>

	return (
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
