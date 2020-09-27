package com.react.restaurant.controller;

import com.react.restaurant.entity.Item;
import com.react.restaurant.service.ItemService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
@RequestMapping("/items")
@Slf4j
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping("/")
    public List<Item> getItems() {
        return itemService.findAll();
    }

    @RequestMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE,  method = RequestMethod.POST)
    public Item addItem(@RequestBody Item item) {
        Item theItem = itemService.save(item);
        return theItem;
    }

    @PostMapping("/upload/")
    public void addMenuItem(@RequestBody Item item) {
        log.info(item.toString());
    }
}
