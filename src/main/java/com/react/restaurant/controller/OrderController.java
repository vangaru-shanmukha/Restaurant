package com.react.restaurant.controller;

import com.react.restaurant.entity.Order;
import com.react.restaurant.entity.Tables;
import com.react.restaurant.service.OrderService;
import com.react.restaurant.service.TableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private TableService tableService;

    @GetMapping("/")
    public List<Order> getOrders() {
        return orderService.findAll();
    }

    @PostMapping("/")
    public Order addOrder(@RequestBody Order order) {
        Order theOrder = orderService.save(order);
        return theOrder;
    }

    @GetMapping("/{tableId}")
    public List<Order> getOrdersOfATable(@PathVariable int tableId) {
        Tables table = tableService.findById(tableId);
        List<Order> orders = orderService.findByTable(table);
        return orders;
    }

    @DeleteMapping("/{orderId}")
    public boolean deleteOrder(@PathVariable int orderId) {
        return orderService.deleteById(orderId);
    }
}
