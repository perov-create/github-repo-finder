import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const githubApi = createApi({
	reducerPath: 'githubApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/' }),
	endpoints: builder => ({
		getReposByUsername: builder.query({
			query: ({ username, page }) =>
				`users/${username}/repos?per_page=20&page=${page}`,
		}),
	}),
})

export const { useGetReposByUsernameQuery } = githubApi
