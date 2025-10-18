import React from 'react';
import { useParking } from '../lib/parkingContext';

export default function ActiveTickets(){
  const { tickets, checkout } = useParking();

  function handleCheckout(id){
    try{
      const closed = checkout(id);
      alert('Checked out. Amount ₹'+closed.amount);
    }catch(err){ alert(err.message); }
  }

  return (
    <div>
      <h2>Active Tickets</h2>
      <div className="tickets-list">
        {tickets.length===0 && <div>No active tickets</div>}
        {tickets.map(t=>(
          <div key={t.id} className="ticket">
            <div>
              <div><strong>{t.vehicleNo}</strong> — {t.slotCode}</div>
              <div style={{color:'#6b7280', fontSize:12}}>In: {new Date(t.inTs).toLocaleString()}</div>
            </div>
            <div>
              <button onClick={()=>handleCheckout(t.id)}>Checkout</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
