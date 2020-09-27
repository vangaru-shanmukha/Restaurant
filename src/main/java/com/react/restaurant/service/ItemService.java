package com.react.restaurant.service;

import com.react.restaurant.entity.Item;
import java.util.List;

public interface ItemService {
    List<Item> findAll();
    Item findById(int id);
    Item save(Item item);
    boolean deleteById(int id);
}
