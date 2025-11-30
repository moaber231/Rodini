import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ id, name, price, image }) => {
	const { addItem } = useCart();
	const placeholder = 'https://via.placeholder.com/600x400?text=Ροδίνι';

	return (
		<div className="product-card card h-100">
			<img src={image || placeholder} alt={name} className="card-img-top" />
			<div className="card-body d-flex flex-column">
				<h5 className="card-title">{name}</h5>
				<p className="card-text text-muted">{price ? price.toFixed ? price.toFixed(2) + '€' : price : ''}</p>
				<div className="mt-auto d-flex gap-2">
					<Link to={`/προιοντα/${id}`} className="btn btn-sm btn-outline-secondary">Περισσότερα</Link>
					<button className="btn btn-sm btn-primary ms-auto" onClick={() => { addItem({ id,name,price,image },1); }}>Πρόσθεσε</button>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;