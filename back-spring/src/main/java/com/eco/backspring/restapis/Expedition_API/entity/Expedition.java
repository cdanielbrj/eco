package com.eco.backspring.restapis.Expedition_API.entity;

import jakarta.persistence.*;
import lombok.Getter;
import com.eco.backspring.restapis.User_API.entity.User;
import com.eco.backspring.restapis.Local_API.entity.Local;
import com.eco.backspring.restapis.Ship_API.entity.Ship;
import com.eco.backspring.restapis.Trash_API.entity.Trash;

import java.util.ArrayList;
import java.util.List;


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

    @Column(nullable = true)
    private String sacosenv;

    @Column(nullable = true)
    private String sacosusd;

    @Column(nullable = true)
    private String pesolixo;

    @ManyToOne
    @JoinColumn(name = "local_id", nullable = true)
    private Local local;

    @ManyToOne
    @JoinColumn(name = "ship_id", nullable = true)
    private Ship ship;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private User user;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "expedition_trash",
            joinColumns = @JoinColumn(name = "expedition_id"),
            inverseJoinColumns = @JoinColumn(name = "trash_id")
    )
    private List<Trash> trashes = new ArrayList<>();

    public void setId(Long id) {
        this.id = id;
    }

    public void setData(String data) {
        this.data = data;
    }

    public void setHora_inicio(String hora_inicio) {
        this.hora_inicio = hora_inicio;
    }

    public void setSacosenv(String sacosenv) {
        this.sacosenv = sacosenv;
    }

    public void setSacosusd(String sacosusd) {
        this.sacosusd = sacosusd;
    }

    public void setPesolixo(String pesolixo) {
        this.pesolixo = pesolixo;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setShip(Ship ship) {
        this.ship = ship;
    }

    public void setLocal(Local local) {
        this.local = local;
    }

    public void setTrashes(List<Trash> trashes) {
        if (trashes != null) {
            this.trashes = trashes;
        } else {
            this.trashes = new ArrayList<>();
        }
    }
}
