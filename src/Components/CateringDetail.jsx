import React from 'react';
import { useParams, Link } from 'react-router-dom';
import items from '../data/data_catering.json';
import { useCart } from '../context/CartContext';

const CateringDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const placeholder = 'https://via.placeholder.com/900x520?text=Ροδίνι';
  const item = items.find((it) => it.id === id);

  if (!item) return <div className="container my-5">Ανεύρεση προϊόντος...</div>;

  return (
    <div className="container my-5">
      <div className="row g-4">
        <div className="col-12 col-md-6">
                    <img src={item.image || placeholder} alt={item.title} className="img-fluid rounded shadow" style={{ maxHeight: 520, objectFit: 'cover', width: '100%' }} />
        </div>
        <div className="col-12 col-md-6">
          <h2>{item.title}</h2>
          <p className="text-muted">{item.short}</p>
          <p>{item.description}</p>
          <h4 className="text-primary">Τιμή: {item.price.toFixed(2)}€</h4>
          <div className="mt-3">
            <button className="btn btn-success me-2" onClick={() => { addItem(item, 1); alert('Προστέθηκε στο καλάθι'); }}>Αγόρασε</button>
            <Link to="/catering" className="btn btn-outline-secondary">Επιστροφή</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CateringDetail;
