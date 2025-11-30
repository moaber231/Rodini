import { Button } from './UI';
import CartItem from './CartItem';

const Cart = ({ items = [] }) => {
	const total = items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);

	return (
		<div className="max-w-lg mx-auto bg-white rounded-2xl shadow p-6 mt-10">
			<h2 className="text-2xl font-bold mb-4">Your Cart</h2>
			<div>
				{items.map((item) => (
					<CartItem key={item.id} item={item} />
				))}
			</div>
			<div className="flex justify-between mt-4 text-xl font-bold">
				<span>Total:</span>
				<span>${total.toFixed(2)}</span>
			</div>
			<Button className="mt-6 w-full rounded-xl text-lg py-6">Checkout</Button>
		</div>
	);
};

export default Cart;