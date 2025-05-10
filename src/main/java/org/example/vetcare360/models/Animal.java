package org.example.vetcare360.models;

public class Animal {
    private int id;
    private String nom;
    private String type;
    private String birthDate;
    private String ownerName;

    public Animal(int id, String nom, String type, String birthDate, String ownerName) {
        this.id = id;
        this.nom = nom;
        this.type = type;
        this.birthDate = birthDate;
        this.ownerName = ownerName;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getBirthDate() { return birthDate; }
    public void setBirthDate(String birthDate) { this.birthDate = birthDate; }

    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }
} 