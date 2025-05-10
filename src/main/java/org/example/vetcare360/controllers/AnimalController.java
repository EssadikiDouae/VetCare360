package org.example.vetcare360.controllers;

import org.example.vetcare360.models.Animal;
import java.util.ArrayList;
import java.util.List;

public class AnimalController {
    private List<Animal> animals = new ArrayList<>();
    private int nextId = 1;

    // إضافة حيوان جديد
    public void addAnimal(String nom, String type, String birthDate, String ownerName) {
        Animal animal = new Animal(nextId++, nom, type, birthDate, ownerName);
        animals.add(animal);
    }

    // تعديل حيوان
    public boolean updateAnimal(int id, String nom, String type, String birthDate, String ownerName) {
        for (Animal animal : animals) {
            if (animal.getId() == id) {
                animal.setNom(nom);
                animal.setType(type);
                animal.setBirthDate(birthDate);
                animal.setOwnerName(ownerName);
                return true;
            }
        }
        return false;
    }

    // حذف حيوان
    public boolean deleteAnimal(int id) {
        return animals.removeIf(animal -> animal.getId() == id);
    }

    // عرض جميع الحيوانات
    public List<Animal> getAnimals() {
        return animals;
    }
} 