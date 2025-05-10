package org.example.vetcare360.controllers;

import org.example.vetcare360.database.database;
import org.example.vetcare360.models.Proprietaire;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ProprietaireController {
    private List<Proprietaire> proprietaires = new ArrayList<>();
    private int nextId = 1;

    // إضافة مالك جديد
    public void addProprietaire(String nom, String prenom, String ville, String adresse, String telephone) {
        Proprietaire p = new Proprietaire(nextId++, nom, prenom, ville, adresse, telephone);
        proprietaires.add(p);
    }

    // تعديل مالك
    public boolean updateProprietaire(int id, String nom, String prenom, String ville, String adresse, String telephone) {
        for (Proprietaire p : proprietaires) {
            if (p.getId() == id) {
                p.setNom(nom);
                p.setPrenom(prenom);
                p.setVille(ville);
                p.setAdresse(adresse);
                p.setTelephone(telephone);
                return true;
            }
        }
        return false;
    }

    // حذف مالك
    public boolean deleteProprietaire(int id) {
        return proprietaires.removeIf(p -> p.getId() == id);
    }

    // عرض جميع المالكين
    public List<Proprietaire> getProprietaires() {
        return proprietaires;
    }

    public static List<Proprietaire> searchByLastName(String lastName) {
        if (lastName == null || lastName.isEmpty()) return new ArrayList<>(proprietaires);
        return proprietaires.stream()
                .filter(p -> p.getLastName().equalsIgnoreCase(lastName))
                .collect(Collectors.toList());
    }

    public static List<Proprietaire> getAllOwners() {
        List<Proprietaire> owners = new ArrayList<>();
        String sql = "SELECT * FROM proprietaires";
        try (Connection conn = database.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                owners.add(new Proprietaire(
                        rs.getInt("id"),
                        rs.getString("first_name"),
                        rs.getString("last_name"),
                        rs.getString("address"),
                        rs.getString("city"),
                        rs.getString("telephone")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return owners;
    }

    public static void addOwner(Proprietaire owner) {
        String sql = "INSERT INTO proprietaires (first_name, last_name, address, city, telephone) VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = database.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, owner.getFirstName());
            stmt.setString(2, owner.getLastName());
            stmt.setString(3, owner.getAddress());
            stmt.setString(4, owner.getCity());
            stmt.setString(5, owner.getTelephone());
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static List<Proprietaire> searchByLastName(String lastName) {
        List<Proprietaire> owners = new ArrayList<>();
        String sql = "SELECT * FROM proprietaires WHERE last_name LIKE ?";
        try (Connection conn = database.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, lastName);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                owners.add(new Proprietaire(
                        rs.getInt("id"),
                        rs.getString("first_name"),
                        rs.getString("last_name"),
                        rs.getString("address"),
                        rs.getString("city"),
                        rs.getString("telephone")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return owners;
    }

    public static void updateOwner(Proprietaire owner) {
        String sql = "UPDATE proprietaires SET first_name=?, last_name=?, city=?, address=?, telephone=? WHERE id=?";
        try (Connection conn = database.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, owner.getFirstName());
            stmt.setString(2, owner.getLastName());
            stmt.setString(3, owner.getCity());
            stmt.setString(4, owner.getAddress());
            stmt.setString(5, owner.getTelephone());
            stmt.setInt(6, owner.getId());
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // جلب مالك حسب id
    public static Proprietaire getOwnerById(int id) {
        try (Connection conn = database.getConnection();
             PreparedStatement stmt = conn.prepareStatement("SELECT * FROM proprietaires WHERE id = ?")) {
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new Proprietaire(
                        rs.getInt("id"),
                        rs.getString("first_name"),
                        rs.getString("last_name"),
                        rs.getString("address"),
                        rs.getString("city"),
                        rs.getString("telephone")
                );
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
} 