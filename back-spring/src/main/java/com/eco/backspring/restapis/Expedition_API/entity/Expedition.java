package com.eco.backspring.restapis.Expedition_API.entity;

import jakarta.persistence.*;
import lombok.Getter;
import com.eco.backspring.restapis.Local_API.entity.Local;
import com.eco.backspring.restapis.Ship_API.entity.Ship;


@Getter
@Entity(name = "expeditions")
public class Expedition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String data;

    @Column(nullable = false)
    private String hora_inicio;

    @ManyToOne
    @JoinColumn(name = "local_id")
    private Local local;

    @ManyToOne
    @JoinColumn(name = "ship_id")
    private Ship ship;

    public void setId(Long id) {
        this.id = id;
    }

    public void setData(String data) {
        this.data = data;
    }

    public void setHora_inicio(String hora_inicio) {
        this.hora_inicio = hora_inicio;
    }

    public void setLocal(Local local) {
        this.local = local;
    }

    public void setShip(Ship ship) {
        this.ship = ship;
    }
}
