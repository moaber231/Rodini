import React from 'react';
import { Link } from 'react-router-dom';
import items from '../data/data_catering.json';
import { useCart } from '../context/CartContext';

const CateringList = () => {
  // data_catering.json uses 'product' as type for catering items in some exports
  // show all items from this file so the catering list displays correctly
  const catering = items; // show all entries from data_catering.json

  const { addItem } = useCart();

  const placeholder = 'https://via.placeholder.com/600x400?text=Ροδίνι';

  return (
    <div className="container my-5">
      <h2 className="mb-4">Catering</h2>
      <div className="row g-4">
        {catering.map((p) => (
          <div className="col-12 col-md-6 col-lg-4" key={p.id}>
            <div className="catering-card card h-100">
              <img src={p.image || placeholder} className="card-img-top" alt={p.title} style={{ height: 220, objectFit: 'cover' }} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text text-muted">{p.short}</p>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <strong className="text-primary">{p.price.toFixed(2)}€</strong>
                  <div>
                    <Link className="btn btn-link btn-sm me-2" to={`/catering/${p.id}`}>Περισσότερες πληροφορίες</Link>
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

export default CateringList;
