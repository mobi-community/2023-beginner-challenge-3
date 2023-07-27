import { DialLogState } from '../../contexts/DiaLogProvider'
import { useSearchParams } from 'react-router-dom'
import Pagination from '../../components/pagination'
import { PostApi } from '../../apis/post'
import Dialog from '../../components/Dialog'
import useFetch from '../../hooks/useFetch'
import useDialog from '../../hooks/useDialog'

const LIMIT_TAKE = 10
const PostListPage = () => {
	const dialog = useDialog()
	const [params] = useSearchParams()

	const { data } = useFetch(
		PostApi.getList,
		{
			target: 'posts',
			params: {
				take: params.get('take') ?? LIMIT_TAKE,
			},
		},
		params,
	)
	const postList = data?.Posts

	const onClickPost = async postId => {
		dialog.default({
			type: DialLogState.CONFIRM,
			text: '정말로 페이지를 이동하겠습니까',
			onConfirm: () => {
				dialog.moveTo({
					text: '정말로 이동해버린다요!',
					url: `/post-detail/${postId}`,
				})
			},
		})
	}

	return (
		<>
			<table>
				<caption>Post List Page</caption>
				<tr>
					<th>제목</th>
					<th>내용</th>
					<th>작성자</th>
				</tr>
				{postList?.map(post => (
					<tr key={post.id} onClick={() => onClickPost(post.id)}>
						<td>{post.title}</td>
						<td>{post.content}</td>
						<td>{post.User.nickName}</td>
					</tr>
				))}
			</table>
			<Pagination target={'posts'} />
			<Dialog />
		</>
	)
}
export default PostListPage
