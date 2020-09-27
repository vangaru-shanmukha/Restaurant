package com.react.restaurant.objectMappers;

import com.react.restaurant.dto.TableDTO;
import com.react.restaurant.entity.Tables;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TableMapper {

    @Autowired
    private ModelMapper mapper;

    public TableDTO convertToDTO(Tables table) {
        TableDTO theTableDTO = mapper.map(table, TableDTO.class);
        return theTableDTO;
    }

    public Tables convertToEntity(TableDTO tableDTO) {
        Tables table = mapper.map(tableDTO, Tables.class);
        return table;
    }
}
