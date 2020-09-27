package com.react.restaurant.repository;

import com.react.restaurant.entity.Order;
import com.react.restaurant.entity.Tables;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends CrudRepository<Order, Integer> {
    List<Order> findByTable(Tables table);
}
