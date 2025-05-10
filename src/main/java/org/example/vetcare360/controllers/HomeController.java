package org.example.vetcare360.controllers;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.stage.Stage;

public class HomeController {
    
    @FXML
    private void handleOwners(ActionEvent event) {
        openPage("/org/example/vetcare360/views/OwnersSearch.fxml", "Owners", event);
    }

    @FXML
    private void handleVeterinarians(ActionEvent event) {
        openPage("/org/example/vetcare360/views/Veterinarians.fxml", "Veterinarians", event);
    }

    @FXML
    private void handleShowOwnersWithPets(ActionEvent event) {
        openPage("/org/example/vetcare360/views/OwnersAnimalsList.fxml", "Owners & Pets", event);
    }

    private void openPage(String fxmlPath, String title, ActionEvent event) {
        try {
            FXMLLoader loader = new FXMLLoader(getClass().getResource(fxmlPath));
            if (loader.getLocation() == null) {
                throw new IllegalStateException("FXML file not found: " + fxmlPath);
            }
            
            Parent root = loader.load();
            Stage stage = new Stage();
            stage.setTitle(title);
            stage.setScene(new Scene(root));
            stage.show();
            
            // إغلاق النافذة الحالية (اختياري)
            // ((Stage) ((Node) event.getSource()).getScene().getWindow()).close();
            
        } catch (Exception e) {
            showError("خطأ في فتح الصفحة", "حدث خطأ أثناء محاولة فتح " + title, e.getMessage());
        }
    }

    private void showError(String title, String header, String content) {
        Alert alert = new Alert(Alert.AlertType.ERROR);
        alert.setTitle(title);
        alert.setHeaderText(header);
        alert.setContentText(content);
        alert.showAndWait();
    }
} 