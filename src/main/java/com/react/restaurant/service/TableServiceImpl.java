package com.react.restaurant.service;

import com.react.restaurant.dto.TableDTO;
import com.react.restaurant.entity.Tables;
import com.react.restaurant.objectMappers.TableMapper;
import com.react.restaurant.repository.TableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TableServiceImpl implements TableService{

    @Autowired
    private TableRepository tableRepository;

    @Autowired
    private TableMapper tableMapper;

    @Override
    public List<Tables> findAll() {
        return (List<Tables>)tableRepository.findAll();
    }

    @Override
    public Tables findById(int id) {
        Optional<Tables> theTables = tableRepository.findById(id);
        if(theTables.get() == null) {
            throw new RuntimeException("Order with id " + id + " not found");
        }
        return theTables.get();
    }

    @Override
    public TableDTO save(TableDTO table) {
        System.out.println(table.toString() + " hello ");
        Tables theTable = tableRepository.save(tableMapper.convertToEntity(table));
        return tableMapper.convertToDTO(theTable);
    }

    @Override
    public boolean deleteById(int id) {
        tableRepository.deleteById(id);
        return true;
    }
}
