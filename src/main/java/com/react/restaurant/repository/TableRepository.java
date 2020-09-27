package com.react.restaurant.repository;

import com.react.restaurant.entity.Tables;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TableRepository extends CrudRepository<Tables, Integer> {

}
