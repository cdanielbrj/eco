package com.eco.backspring.restapis.Expedition_API.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public class Expedition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String data;
    @Column(nullable = false)
    private String hora_inicio;
    @Column(nullable = false)
    private String local_coleta;
    @Column(nullable = false)
    private String bolsista;
    @Column(nullable = false)
    private String barco;

    //  Set Id
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    //  Get & Set Data
    public String getData() {
        return data;
    }
    public void setData(String data) {
        this.data = data;
    }

    //  Get & Set Hora
    public String getHora_inicio() {
        return hora_inicio;
    }
    public void setHora_inicio(String hora_inicio) {
        this.hora_inicio = hora_inicio;
    }

    //  Get & Set Local
    public String getLocal_coleta() {
        return local_coleta;
    }
    public void setLocal_coleta(String local_coleta) {
        this.local_coleta = local_coleta;
    }

    //  Get & Set Bolsista
    public String getBolsista() {
        return bolsista;
    }
    public void setBolsista(String bolsista) {
        this.bolsista = bolsista;
    }

    //  Get & Set Barco
    public String getBarco() {
        return barco;
    }
    public void setBarco(String barco) {
        this.barco = barco;
    }
}
