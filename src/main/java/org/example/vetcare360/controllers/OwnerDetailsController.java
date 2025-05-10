package org.example.vetcare360.controllers;

import javafx.collections.FXCollections;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.stage.Stage;
import org.example.vetcare360.models.Animal;
import org.example.vetcare360.models.Proprietaire;

import java.util.List;

public class OwnerDetailsController {
    @FXML
    private Label nameLabel;
    @FXML
    private Label addressLabel;
    @FXML
    private Label cityLabel;
    @FXML
    private Label telephoneLabel;

    @FXML
    private TableView<Animal> petsTable;
    @FXML
    private TableColumn<Animal, String> petNameColumn;
    @FXML
    private TableColumn<Animal, String> petBirthDateColumn;
    @FXML
    private TableColumn<Animal, String> petTypeColumn;
    @FXML
    private TableColumn<Animal, Void> petActionsColumn;

    private Proprietaire owner;

    public void setOwner(Proprietaire owner) {
        this.owner = owner;
        nameLabel.setText(owner.getFirstName() + " " + owner.getLastName());
        addressLabel.setText(owner.getAddress());
        cityLabel.setText(owner.getCity());
        telephoneLabel.setText(owner.getTelephone());

        loadPets();
    }

    private void loadPets() {
        List<Animal> animals = AnimalController.getAnimalsByOwnerId(owner.getId());
        petsTable.setItems(FXCollections.observableArrayList(animals));

        petNameColumn.setCellValueFactory(cellData -> new javafx.beans.property.SimpleStringProperty(cellData.getValue().getName()));
        petBirthDateColumn.setCellValueFactory(cellData ->
            new javafx.beans.property.SimpleStringProperty(cellData.getValue().getBirthDate())
        );
        petTypeColumn.setCellValueFactory(cellData -> new javafx.beans.property.SimpleStringProperty(cellData.getValue().getType()));

        // زرّي تعديل الحيوان وإضافة زيارة
        petActionsColumn.setCellFactory(col -> new TableCell<Animal, Void>() {
            private final Button editPetBtn = new Button("Edit Pet");
            private final Button addVisitBtn = new Button("Add Visit");
            private final HBox hbox = new HBox(10, editPetBtn, addVisitBtn);

            {
                editPetBtn.setOnAction(e -> {
                    Animal animal = getTableView().getItems().get(getIndex());
                    handleEditPet(animal);
                });
                addVisitBtn.setOnAction(e -> {
                    Animal animal = getTableView().getItems().get(getIndex());
                    handleAddVisit(animal);
                });
            }

            @Override
            protected void updateItem(Void item, boolean empty) {
                super.updateItem(item, empty);
                if (empty) {
                    setGraphic(null);
                } else {
                    setGraphic(hbox);
                }
            }
        });
    }

    @FXML
    private void handleEditOwner() {
        try {
            FXMLLoader loader = new FXMLLoader(getClass().getResource("/org/example/vetcare360/views/OwnerForm.fxml"));
            Parent root = loader.load();
            OwnerFormController controller = loader.getController();
            controller.setOwnerToEdit(owner);

            Stage stage = new Stage();
            stage.setTitle("Edit Owner");
            stage.setScene(new Scene(root));
            stage.show();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @FXML
    private void handleAddNewPet() {
        try {
            FXMLLoader loader = new FXMLLoader(getClass().getResource("/org/example/vetcare360/views/AnimalForm.fxml"));
            Parent root = loader.load();
            AnimalFormController controller = loader.getController();
            controller.setOwner(owner);

            Stage stage = new Stage();
            stage.setTitle("Add New Pet");
            stage.setScene(new Scene(root));
            stage.show();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void handleEditPet(Animal animal) {
        try {
            FXMLLoader loader = new FXMLLoader(getClass().getResource("/org/example/vetcare360/views/AnimalForm.fxml"));
            Parent root = loader.load();
            AnimalFormController controller = loader.getController();
            controller.setAnimalToEdit(animal);

            Stage stage = new Stage();
            stage.setTitle("Edit Pet");
            stage.setScene(new Scene(root));
            stage.show();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void handleAddVisit(Animal animal) {
        try {
            FXMLLoader loader = new FXMLLoader(getClass().getResource("/org/example/vetcare360/views/VisiteForm.fxml"));
            Parent root = loader.load();
            VisiteFormController controller = loader.getController();
            controller.setAnimal(animal);

            Stage stage = new Stage();
            stage.setTitle("Add Visit");
            stage.setScene(new Scene(root));
            stage.show();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
} 