package com.parking.model;

public class Slot {
    private String code;
    private String type;
    private boolean isFree;

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public boolean isFree() { return isFree; }
    public void setFree(boolean free) { isFree = free; }
}
