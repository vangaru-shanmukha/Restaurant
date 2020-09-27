package com.react.restaurant.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Type;

import javax.persistence.*;

@Entity
@Table(name = "items")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Item {

    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "type")
    private String type;

    @Column(name = "name")
    private String name;

    @Column(name = "cost")
    private double cost;

    @Column(name="image")
    @Type(type="org.hibernate.type.BinaryType")
    private byte[] image;

}
