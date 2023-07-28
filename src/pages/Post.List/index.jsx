import { DialLogState } from '../../contexts/DiaLogProvider'
import { useSearchParams } from 'react-router-dom'
import Pagination from '../../components/pagination'
import { PostApi } from '../../apis/post'
import Dialog from '../../components/Dialog'
import useFetch from '../../hooks/useFetch'
import useDialog from '../../hooks/useDialog'

const LIMIT_TAKE = 10
const LIMIT_PAGE = 10

const PostListPage = () => {
	const dialog = useDialog()
	const [params, setParams] = useSearchParams()

	const { data } = useFetch(
		PostApi.getList,
		{
			target: 'posts',
			params: {
				take: params.get('take') ?? LIMIT_TAKE,
				page: params.get('page') ?? 1,
				limit: params.get('limit') ?? LIMIT_PAGE,
			},
		},
		params,
	)
	const postList = data?.Posts
	const pageNation = data?.PageNation

	const onClickPost = async postId => {
		dialog.default({
			type: DialLogState.CONFIRM,
			text: '정말로 페이지를 이동하겠습니까',
			url: `/post-detail/${postId}`,
			// onConfirm: () => {
			// 	dialog.moveTo({
			// 		text: '정말로 이동해버린다요!',
			// 		url: `/post-detail/${postId}`,
			// 	})
			// },
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
			<Pagination pageNation={pageNation} setParams={setParams} />
			<Dialog />
		</>
	)
}
export default PostListPage
