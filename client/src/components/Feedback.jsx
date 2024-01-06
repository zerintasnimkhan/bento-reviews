import React from 'react'; 
import Card from './Card';

const Feedback = () => {
	const cards = [
		{
			image: 'https://img.icons8.com/color/452/GeeksforGeeks.png',
			color: '#55ccff'
		},
		{
			image: 'https://img.icons8.com/color/452/GeeksforGeeks.png',
			color: '#e8e8e8'
		},
		{
			image: 'https://img.icons8.com/color/452/GeeksforGeeks.png',
			color: '#0a043c'
		},
		{
			image: 'https://img.icons8.com/color/452/GeeksforGeeks.png',
			color: 'black'
		}
	];

	return (
		<div className='App'>

			{/* Traversing through cards array using map function
	and populating card with different image and color */}

			{cards.map((card) => (
				<Card image={card.image} color={card.color} />
			))}
		</div>
	);
};

//ReactDOM.render(<App />, document.getElementById('root'));

export default Feedback;
