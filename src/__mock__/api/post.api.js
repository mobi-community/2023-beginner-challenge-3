// msw를 사용하여 가상의 REST API endpoint 생성
import { rest } from 'msw'
import {
	definePostComment,
	definePostDetail,
	definePostList,
} from '../data/post.data'
import { handlePagination } from '../../utils/handlePagination'

// getPostList와 getCommentList 페이지네이션 로직 분리 > 완료!
// page, limit, take 로직 분리

// 게시글 목록 반환
export const getPostList = rest.get('/api/posts', async (req, res, ctx) => {
	// page, limmit, take parameter를 query string으로 받아서 페이지네이션 처리
	const page = req.url.searchParams.get('page')
	const limit = req.url.searchParams.get('limit')
	const take = req.url.searchParams.get('take')
	const count = 486

	const resultObj = await handlePagination(
		page,
		limit,
		take,
		count,
		'Posts',
		definePostList,
	)

	// 200 상태 코드와 페이지네이션 정보 반환
	return res(ctx.status(200), ctx.json(resultObj))
})

// 댓글 목록 반환
export const getCommentList = rest.get(
	'/api/comments',
	async (req, res, ctx) => {
		const page = req.url.searchParams.get('page')
		const limit = req.url.searchParams.get('limit')
		const take = req.url.searchParams.get('take')
		const count = 311

		const resultObj = await handlePagination(
			page,
			limit,
			take,
			count,
			'Comments',
			definePostComment,
		)

		return res(ctx.status(200), ctx.json(resultObj))
	},
)

// 특정 게시글의 상세 정보 반환
export const getPostDetail = rest.get('/api/post', (req, res, ctx) => {
	return res(ctx.status(200), ctx.json(definePostDetail))
})
