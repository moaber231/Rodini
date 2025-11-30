import React from 'react';
import { Link } from 'react-router-dom';
import items from '../data/data_items.json';
import { useCart } from '../context/CartContext';

const ProductsList = () => {
  const products = items.filter((it) => it.type === 'product');

  const { addItem } = useCart();

  const placeholder = 'https://via.placeholder.com/600x400?text=Ροδίνι';

  return (
    <div className="container my-5">
      <h2 className="mb-4">Προϊόντα</h2>
      <div className="row g-4">
        {products.map((p) => (
          <div className="col-12 col-md-6 col-lg-4" key={p.id}>
            <div className="card h-100 shadow-sm">
              <img src={p.image || placeholder} className="card-img-top" alt={p.title} style={{ height: 220, objectFit: 'cover' }} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text text-muted">{p.short}</p>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <strong className="text-primary">{p.price.toFixed(2)}€</strong>
                  <div>
                    <Link className="btn btn-link btn-sm me-2" to={`/προιοντα/${p.id}`}>Περισσότερες πληροφορίες</Link>
                    <button className="btn btn-sm btn-success" onClick={() => { addItem(p, 1); alert('Προστέθηκε στο καλάθι'); }}>Αγόρασε</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
