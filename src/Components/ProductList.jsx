import ProductCard from './ProductCard';

const ProductList = ({ products = [] }) => {
	return (
		<div className="container my-4">
			<div className="row g-4">
				{products.map((p) => (
					<div className="col-12 col-md-6 col-lg-4" key={p.id}>
						<ProductCard id={p.id} name={p.name} price={p.price} image={p.image} />
					</div>
				))}
			</div>
		</div>
	);
};

export default ProductList;