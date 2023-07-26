import { axiosInstance } from './@core'

export const PostApi = {
	getList: async ({ target, params }) =>
		await axiosInstance.get(`/${target}`, { params }),
}
