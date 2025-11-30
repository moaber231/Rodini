
import { Button } from './UI';

const CartItem = ({ item }) => {
	return (
		<div className="flex justify-between items-center p-4 border-b">
			<div className="flex items-center gap-4">
				<img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
				<div>
					<h4 className="font-semibold">{item.name}</h4>
					<p>${item.price} x {item.quantity}</p>
				</div>
			</div>
			<Button variant="outline" className="rounded-xl">Remove</Button>
		</div>
	);
};

export default CartItem;
