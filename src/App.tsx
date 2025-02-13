import React, { useState } from 'react'
import RepoList from './components/RepoList'
import SearchBar from './components/SearchBar'

const App: React.FC = () => {
	const [username, setUsername] = useState('')

	return (
		<div className='min-h-screen bg-gray-900 text-white flex flex-col items-center p-6'>
			<h1 className='text-4xl font-bold mb-6 text-blue-400'>
				GitHub Repo Finder
			</h1>
			<SearchBar onSearch={setUsername} />
			{username && <RepoList username={username} />}
		</div>
	)
}

export default App
