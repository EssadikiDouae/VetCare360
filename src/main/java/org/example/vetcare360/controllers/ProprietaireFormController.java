package org.example.vetcare360.controllers;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import org.example.vetcare360.models.Proprietaire;

public class ProprietaireFormController {

    @FXML
    private TextField nomField;
    @FXML
    private TextField prenomField;
    @FXML
    private TextField villeField;
    @FXML
    private TextField adresseField;
    @FXML
    private TextField telephoneField;
    @FXML
    private TableView<Proprietaire> proprietaireTable;
    @FXML
    private TableColumn<Proprietaire, Integer> idColumn;
    @FXML
    private TableColumn<Proprietaire, String> nomColumn;
    @FXML
    private TableColumn<Proprietaire, String> prenomColumn;
    @FXML
    private TableColumn<Proprietaire, String> villeColumn;
    @FXML
    private TableColumn<Proprietaire, String> adresseColumn;
    @FXML
    private TableColumn<Proprietaire, String> telephoneColumn;

    private static ProprietaireController proprietaireController = new ProprietaireController();
    private ObservableList<Proprietaire> proprietaireList = FXCollections.observableArrayList();
    private Proprietaire selectedProprietaire = null;

    @FXML
    public void initialize() {
        idColumn.setCellValueFactory(cellData -> new javafx.beans.property.SimpleIntegerProperty(cellData.getValue().getId()).asObject());
        nomColumn.setCellValueFactory(cellData -> new javafx.beans.property.SimpleStringProperty(cellData.getValue().getNom()));
        prenomColumn.setCellValueFactory(cellData -> new javafx.beans.property.SimpleStringProperty(cellData.getValue().getPrenom()));
        villeColumn.setCellValueFactory(cellData -> new javafx.beans.property.SimpleStringProperty(cellData.getValue().getVille()));
        adresseColumn.setCellValueFactory(cellData -> new javafx.beans.property.SimpleStringProperty(cellData.getValue().getAdresse()));
        telephoneColumn.setCellValueFactory(cellData -> new javafx.beans.property.SimpleStringProperty(cellData.getValue().getTelephone()));
        proprietaireTable.setItems(proprietaireList);

        // عند تحديد صف في الجدول، تعبئة الحقول
        proprietaireTable.getSelectionModel().selectedItemProperty().addListener((obs, oldSelection, newSelection) -> {
            if (newSelection != null) {
                selectedProprietaire = newSelection;
                nomField.setText(selectedProprietaire.getNom());
                prenomField.setText(selectedProprietaire.getPrenom());
                villeField.setText(selectedProprietaire.getVille());
                adresseField.setText(selectedProprietaire.getAdresse());
                telephoneField.setText(selectedProprietaire.getTelephone());
            }
        });
    }

    @FXML
    private void handleAddProprietaire() {
        String nom = nomField.getText();
        String prenom = prenomField.getText();
        String ville = villeField.getText();
        String adresse = adresseField.getText();
        String telephone = telephoneField.getText();

        if (nom.isEmpty() || prenom.isEmpty() || ville.isEmpty() || adresse.isEmpty() || telephone.isEmpty()) {
            Alert alert = new Alert(Alert.AlertType.ERROR, "يرجى ملء جميع الحقول!");
            alert.showAndWait();
            return;
        }

        proprietaireController.addProprietaire(nom, prenom, ville, adresse, telephone);
        // تحديث القائمة
        proprietaireList.setAll(proprietaireController.getProprietaires());

        Alert alert = new Alert(Alert.AlertType.INFORMATION, "تمت إضافة المالك بنجاح!");
        alert.showAndWait();

        nomField.clear();
        prenomField.clear();
        villeField.clear();
        adresseField.clear();
        telephoneField.clear();
    }

    @FXML
    private void handleUpdateProprietaire() {
        if (selectedProprietaire == null) {
            Alert alert = new Alert(Alert.AlertType.ERROR, "يرجى اختيار مالك من الجدول أولاً!");
            alert.showAndWait();
            return;
        }
        String nom = nomField.getText();
        String prenom = prenomField.getText();
        String ville = villeField.getText();
        String adresse = adresseField.getText();
        String telephone = telephoneField.getText();
        if (nom.isEmpty() || prenom.isEmpty() || ville.isEmpty() || adresse.isEmpty() || telephone.isEmpty()) {
            Alert alert = new Alert(Alert.AlertType.ERROR, "يرجى ملء جميع الحقول!");
            alert.showAndWait();
            return;
        }
        boolean updated = proprietaireController.updateProprietaire(selectedProprietaire.getId(), nom, prenom, ville, adresse, telephone);
        if (updated) {
            proprietaireList.setAll(proprietaireController.getProprietaires());
            Alert alert = new Alert(Alert.AlertType.INFORMATION, "تم تعديل بيانات المالك بنجاح!");
            alert.showAndWait();
            // تفريغ الحقول
            nomField.clear();
            prenomField.clear();
            villeField.clear();
            adresseField.clear();
            telephoneField.clear();
            selectedProprietaire = null;
        }
    }

    @FXML
    private void handleDeleteProprietaire() {
        if (selectedProprietaire == null) {
            Alert alert = new Alert(Alert.AlertType.ERROR, "يرجى اختيار مالك من الجدول أولاً!");
            alert.showAndWait();
            return;
        }
        boolean deleted = proprietaireController.deleteProprietaire(selectedProprietaire.getId());
        if (deleted) {
            proprietaireList.setAll(proprietaireController.getProprietaires());
            Alert alert = new Alert(Alert.AlertType.INFORMATION, "تم حذف المالك بنجاح!");
            alert.showAndWait();
            // تفريغ الحقول
            nomField.clear();
            prenomField.clear();
            villeField.clear();
            adresseField.clear();
            telephoneField.clear();
            selectedProprietaire = null;
        }
    }
} 