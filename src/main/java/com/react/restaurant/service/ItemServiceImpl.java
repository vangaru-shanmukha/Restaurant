package com.react.restaurant.service;

import com.react.restaurant.entity.Item;
import com.react.restaurant.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemServiceImpl implements ItemService{

    @Autowired
    private ItemRepository itemRepository;

    @Override
    public List<Item> findAll() {
        return (List<Item>)itemRepository.findAll();
    }

    @Override
    public Item findById(int id) {
        Optional<Item> theItem = itemRepository.findById(id);
        if(theItem.get() == null) {
            throw new RuntimeException("Item with id " + id + " not found");
        }
        return theItem.get();
    }

    @Override
    public Item save(Item item) {
        itemRepository.save(item);
        return item;
    }

    @Override
    public boolean deleteById(int id) {
        itemRepository.deleteById(id);
        return true;
    }
}
