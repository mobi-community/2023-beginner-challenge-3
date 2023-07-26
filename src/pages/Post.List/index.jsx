import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Pagination from '../../components/pagination'
import { PostApi } from '../../apis/post'
import { IsUserName } from '../../utils/isUserName'
import useFetch from '../../hooks/useFetch'

const LIMIT_TAKE = 10
const PostListPage = () => {
	const [params] = useSearchParams()
	// const [, setDiaLogAttribute] = useDiaLogStore();

	const { data, loading, error } = useFetch(PostApi.getList, {
		target: 'posts',
		params: { take: params.get('take') ?? LIMIT_TAKE },
	})
	const postList = data?.Posts

	useEffect(() => {
		IsUserName()
	}, [])

	// const onClickPost = async (postId) => {
	//   await setDiaLogAttribute({
	//     type: DialLogState.CONFIRM,
	//     text: "정말로 페이지를 이동하겠습니까",
	//     isOpen: true,
	//     onConfirm: async () => {
	//       await setDiaLogAttribute({
	//         text: "정말로 이동해버린다요!",
	//         onConfirm: async () => {
	//           window.location.href = `/post-detail/${postId}`;
	//         },
	//       });
	//     },
	//     onCancel: () => {
	//       setDiaLogAttribute({ isOpen: false });
	//     },
	//   });
	// };
	const onClickPost = async postId => {
		// await setDiaLogAttribute({
		//   type: DialLogState.CONFIRM,
		//   text: "정말로 페이지를 이동하겠습니까",
		//   isOpen: true,
		//   onConfirm: async () => {
		//     await setDiaLogAttribute({
		//       text: "정말로 이동해버린다요!",
		//       onConfirm: async () => {
		//         window.location.href = `/post-detail/${postId}`;
		//       },
		//     });
		//   },
		//   onCancel: () => {
		//     setDiaLogAttribute({ isOpen: false });
		//   },
		// });
	}

	if (loading) return <div>로딩중...</div>

	return (
		<>
			<table>
				<caption>Post List Page</caption>
				<tr>
					<th>제목</th>
					<th>내용</th>
					<th>작성자</th>
				</tr>
				{postList.map(post => (
					<tr key={post.id} onClick={() => onClickPost(post.id)}>
						<td>{post.title}</td>
						<td>{post.content}</td>
						<td>{post.User.nickName}</td>
					</tr>
				))}
			</table>
			<Pagination target={'posts'} />
		</>
	)
}
export default PostListPage
