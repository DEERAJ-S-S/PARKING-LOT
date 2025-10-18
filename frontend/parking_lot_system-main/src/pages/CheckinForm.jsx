import React, { useState } from 'react';
import { useParking } from '../lib/parkingContext';
import FeePreview from '../components/FeePreview';

export default function CheckinForm(){
  const { slots, checkin, findNearestFreeSlotByType } = useParking();
  const types = Array.from(new Set(slots.map(s=>s.type)));
  const [vehicleNo,setVehicleNo] = useState('');
  const [type,setType] = useState(types[0]||'Compact');
  const [msg,setMsg] = useState(null);
  const [previewTicket,setPreviewTicket] = useState(null);

  function handlePreview(){
    try {
      const slot = findNearestFreeSlotByType(type);
      if(!slot) throw new Error('No free slot for type');
      setPreviewTicket({ slotCode: slot.code, inTs: new Date().toISOString(), vehicleNo, type });
      setMsg(null);
    } catch(err){ setMsg({type:'error',text:err.message}); }
  }

  function handleSubmit(e){
    e.preventDefault();
    try{
      const ticket = checkin({vehicleNo,type});
      setMsg({type:'success',text:'Checked in to '+ticket.slotCode});
      setVehicleNo('');
      setPreviewTicket(null);
    }catch(err){ setMsg({type:'error',text:err.message}); }
  }

  return (
    <div>
      <h2>Vehicle Check-in</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label>Vehicle No</label>
          <input value={vehicleNo} onChange={e=>setVehicleNo(e.target.value)} required />
          <label>Type</label>
          <select value={type} onChange={e=>setType(e.target.value)}>
            {types.map(t=> <option key={t} value={t}>{t}</option>)}
          </select>
          <button type="button" onClick={handlePreview}>Preview Fee</button>
          <button type="submit">Check-in</button>
        </div>
      </form>

      {msg && <div style={{marginTop:8,color: msg.type==='error'? 'red':'green'}}>{msg.text}</div>}
      {previewTicket && <FeePreview ticket={previewTicket} />}

    </div>
  );
}
