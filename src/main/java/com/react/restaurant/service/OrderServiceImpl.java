package com.react.restaurant.service;

import com.react.restaurant.entity.Order;
import com.react.restaurant.entity.Tables;
import com.react.restaurant.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService{

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public List<Order> findAll() {
        return (List<Order>)orderRepository.findAll();
    }

    @Override
    public Order findById(int id) {
        Optional<Order> theOrder = orderRepository.findById(id);
        if(theOrder.get() == null) {
            throw new RuntimeException("Order with id " + id + " not found");
        }
        return theOrder.get();
    }

    @Override
    public Order save(Order order) {
        orderRepository.save(order);
        return order;
    }

    @Override
    public boolean deleteById(int id) {
        orderRepository.deleteById(id);
        return true;
    }

    @Override
    public List<Order> findByTable(Tables table) {
        return orderRepository.findByTable(table);
    }
}
