import React from 'react';
import { useParking } from '../lib/parkingContext';

export default function FeePreview({ticket}){
  const { computeFee } = useParking();
  const fake = {...ticket, inTs: ticket.inTs};
  const amount = computeFee(fake, new Date().toISOString());
  return (
    <div style={{marginTop:12, padding:12, background:'#fff', borderRadius:8}}>
      <strong>Fee Preview</strong>
      <div>Slot: {ticket.slotCode}</div>
      <div>Vehicle: {ticket.vehicleNo || '—'}</div>
      <div>Estimated (so far): ₹{amount}</div>
    </div>
  );
}
