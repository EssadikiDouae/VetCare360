package org.example.vetcare360.controllers;

import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.TextField;
import org.example.vetcare360.models.Proprietaire;

public class OwnerFormController {
    @FXML
    private TextField firstNameField;
    @FXML
    private TextField lastNameField;
    @FXML
    private TextField addressField;
    @FXML
    private TextField cityField;
    @FXML
    private TextField telephoneField;

    @FXML
    private void handleSaveOwner() {
        String firstName = firstNameField.getText();
        String lastName = lastNameField.getText();
        String city = cityField.getText();
        String address = addressField.getText();
        String telephone = telephoneField.getText();

        if (firstName.isEmpty() || lastName.isEmpty() || city.isEmpty() || address.isEmpty() || telephone.isEmpty()) {
            Alert alert = new Alert(Alert.AlertType.ERROR, "يرجى ملء جميع الحقول!");
            alert.showAndWait();
            return;
        }

        Proprietaire owner = new Proprietaire(0, firstName, lastName, city, address, telephone);
        ProprietaireController.addOwner(owner);

        Alert alert = new Alert(Alert.AlertType.INFORMATION, "تمت إضافة المالك بنجاح!");
        alert.showAndWait();

        // تفريغ الحقول بعد الإضافة
        firstNameField.clear();
        lastNameField.clear();
        addressField.clear();
        cityField.clear();
        telephoneField.clear();
    }
} 