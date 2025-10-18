package com.parking.model;

import java.time.LocalDateTime;

public class Ticket {
    private Long id;
    private String slotCode;
    private String vehicleNo;
    private LocalDateTime inTs;
    private LocalDateTime outTs;
    private Double amount;
    private String status;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSlotCode() { return slotCode; }
    public void setSlotCode(String slotCode) { this.slotCode = slotCode; }

    public String getVehicleNo() { return vehicleNo; }
    public void setVehicleNo(String vehicleNo) { this.vehicleNo = vehicleNo; }

    public LocalDateTime getInTs() { return inTs; }
    public void setInTs(LocalDateTime inTs) { this.inTs = inTs; }

    public LocalDateTime getOutTs() { return outTs; }
    public void setOutTs(LocalDateTime outTs) { this.outTs = outTs; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
