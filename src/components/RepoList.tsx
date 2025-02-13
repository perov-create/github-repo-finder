import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useGetReposByUsernameQuery } from '../services/githubApi'

interface Repository {
	id: number
	name: string
	description: string | null
	html_url: string
	stargazers_count: number
	updated_at: string
}

interface RepoListProps {
	username: string
}

const RepoList: React.FC<RepoListProps> = ({ username }) => {
	const [page, setPage] = useState<number>(1)
	const [repos, setRepos] = useState<Repository[]>([])
	const [hasMore, setHasMore] = useState<boolean>(true)

	const { data, error, isLoading } = useGetReposByUsernameQuery({
		username,
		page,
	})

	useEffect(() => {
		if (data) {
			setRepos(prevRepos => [...prevRepos, ...data])
			if (data.length < 20) {
				setHasMore(false)
			}
		}
	}, [data])

	useEffect(() => {
		setRepos([])
		setPage(1)
		setHasMore(true)
	}, [username])

	if (isLoading && page === 1)
		return <p className='text-center mt-6'>Loading...</p>
	if (error)
		return (
			<p className='text-center mt-6 text-red-500'>
				Error loading repositories
			</p>
		)

	return (
		<InfiniteScroll
			dataLength={repos.length}
			next={() => setPage(prev => prev + 1)}
			hasMore={hasMore}
			loader={<p className='text-center mt-4'>Loading more...</p>}
			className='w-full max-w-3xl mt-6'
		>
			{repos.map(repo => (
				<div
					key={repo.id}
					className='bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 mb-4 max-w-xs flex-1'
				>
					<h3 className='text-xl font-bold text-blue-400'>{repo.name}</h3>
					<p className='text-gray-400'>
						{repo.description || 'No description available'}
					</p>
					<div className='flex justify-between items-center mt-2'>
						<a
							href={repo.html_url}
							target='_blank'
							rel='noopener noreferrer'
							className='text-blue-500 hover:underline'
						>
							View on GitHub
						</a>
						<p className='text-yellow-400'>⭐ {repo.stargazers_count}</p>
					</div>
					<p className='text-sm text-gray-500 mt-2'>
						Last updated: {new Date(repo.updated_at).toLocaleDateString()}
					</p>
				</div>
			))}
		</InfiniteScroll>
	)
}

export default RepoList
