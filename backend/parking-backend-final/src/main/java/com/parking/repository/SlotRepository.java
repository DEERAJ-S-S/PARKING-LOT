package com.parking.repository;

import com.parking.model.Slot;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SlotRepository {
    private final JdbcTemplate jdbcTemplate;

    public SlotRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    private RowMapper<Slot> mapper = (rs, rowNum) -> {
        Slot s = new Slot();
        s.setCode(rs.getString("code"));
        s.setType(rs.getString("type"));
        s.setFree(rs.getBoolean("is_free"));
        return s;
    };

    public List<Slot> findAll() {
        return jdbcTemplate.query("SELECT * FROM slot", mapper);
    }

    public List<Slot> findFree() {
        return jdbcTemplate.query("SELECT * FROM slot WHERE is_free=1", mapper);
    }

    public void occupy(String code) {
        jdbcTemplate.update("UPDATE slot SET is_free=0 WHERE code=?", code);
    }

    public void release(String code) {
        jdbcTemplate.update("UPDATE slot SET is_free=1 WHERE code=?", code);
    }

    public Slot findNearestFree(String type) {
        List<Slot> list = jdbcTemplate.query("SELECT * FROM slot WHERE type=? AND is_free=1 LIMIT 1", mapper, type);
        return list.isEmpty() ? null : list.get(0);
    }
}
