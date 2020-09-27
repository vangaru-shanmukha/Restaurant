package com.react.restaurant.service;

import com.react.restaurant.entity.Order;
import com.react.restaurant.entity.Tables;

import java.util.List;

public interface OrderService {
    List<Order> findAll();
    Order findById(int id);
    Order save(Order order);
    boolean deleteById(int id);
    List<Order> findByTable(Tables table);
}
