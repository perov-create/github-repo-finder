import React, { useState } from 'react'

interface SearchBarProps {
	onSearch: (username: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const [username, setUsername] = useState('')

	return (
		<div className='flex gap-4'>
			<input
				type='text'
				value={username}
				onChange={e => setUsername(e.target.value)}
				placeholder='Enter GitHub username'
				className='p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
			/>
			<button
				onClick={() => onSearch(username)}
				className='bg-blue-500 px-4 py-2 rounded-lg text-white font-semibold hover:bg-blue-600 cursor-pointer transition'
			>
				Search
			</button>
		</div>
	)
}

export default SearchBar
