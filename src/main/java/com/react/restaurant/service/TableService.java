package com.react.restaurant.service;

import com.react.restaurant.dto.TableDTO;
import com.react.restaurant.entity.Tables;
import java.util.List;

public interface TableService {
    List<Tables> findAll();
    Tables findById(int id);
    TableDTO save(TableDTO table);
    boolean deleteById(int id);
}
