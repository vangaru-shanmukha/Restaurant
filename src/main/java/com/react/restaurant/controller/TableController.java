package com.react.restaurant.controller;

import com.react.restaurant.dto.TableDTO;
import com.react.restaurant.entity.Tables;
import com.react.restaurant.service.TableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
@RequestMapping("/tables")
public class TableController {

    @Autowired
    private TableService tableService;

    @GetMapping("/")
    public List<Tables> getTables() {
        return tableService.findAll();
    }

    @PostMapping("/")
    public TableDTO addTable(@RequestBody TableDTO tableDTO) {
        System.out.println(tableDTO.toString());
        TableDTO theTable = tableService.save(tableDTO);
        return theTable;
    }

    @GetMapping("/{id}")
    public Tables getTable(@PathVariable int id) {
        Tables theTable = tableService.findById(id);
        return theTable;
    }
}
