package org.example.vetcare360.controllers;

import javafx.collections.FXCollections;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Hyperlink;
import javafx.scene.control.TableCell;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.stage.Stage;
import org.example.vetcare360.models.Animal;
import org.example.vetcare360.models.OwnerWithPets;
import org.example.vetcare360.models.Proprietaire;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class OwnersAnimalsListController {
    @FXML
    private TableView<OwnerWithPets> ownersAnimalsTable;
    @FXML
    private TableColumn<OwnerWithPets, String> nameColumn;
    @FXML
    private TableColumn<OwnerWithPets, String> addressColumn;
    @FXML
    private TableColumn<OwnerWithPets, String> cityColumn;
    @FXML
    private TableColumn<OwnerWithPets, String> telephoneColumn;
    @FXML
    private TableColumn<OwnerWithPets, String> petsColumn;

    @FXML
    public void initialize() {
        nameColumn.setCellValueFactory(cellData -> new javafx.beans.property.SimpleStringProperty(cellData.getValue().getName()));
        addressColumn.setCellValueFactory(cellData -> new javafx.beans.property.SimpleStringProperty(cellData.getValue().getAddress()));
        cityColumn.setCellValueFactory(cellData -> new javafx.beans.property.SimpleStringProperty(cellData.getValue().getCity()));
        telephoneColumn.setCellValueFactory(cellData -> new javafx.beans.property.SimpleStringProperty(cellData.getValue().getTelephone()));
        petsColumn.setCellValueFactory(cellData -> new javafx.beans.property.SimpleStringProperty(cellData.getValue().getPets()));

        // اجعل اسم المالك يظهر كـ Hyperlink
        nameColumn.setCellFactory(tc -> new TableCell<OwnerWithPets, String>() {
            private final Hyperlink link = new Hyperlink();

            {
                link.setOnAction(e -> {
                    OwnerWithPets ownerWithPets = getTableView().getItems().get(getIndex());
                    handleOwnerDetails(ownerWithPets);
                });
            }

            @Override
            protected void updateItem(String name, boolean empty) {
                super.updateItem(name, empty);
                if (empty || name == null) {
                    setGraphic(null);
                } else {
                    link.setText(name);
                    setGraphic(link);
                }
            }
        });

        loadOwnersWithPets();
    }

    private void loadOwnersWithPets() {
        List<Proprietaire> owners = ProprietaireController.getAllOwners();
        List<OwnerWithPets> data = new ArrayList<>();
        for (Proprietaire owner : owners) {
            List<Animal> animals = AnimalController.getAnimalsByOwnerId(owner.getId());
            String pets = animals.stream().map(Animal::getName).collect(Collectors.joining(", "));
            data.add(new OwnerWithPets(
                    owner.getId(), // تأكد أن OwnerWithPets لديه حقل id
                    owner.getFirstName() + " " + owner.getLastName(),
                    owner.getAddress(),
                    owner.getCity(),
                    owner.getTelephone(),
                    pets
            ));
        }
        ownersAnimalsTable.setItems(FXCollections.observableArrayList(data));
    }

    // فتح نافذة تفاصيل المالك
    private void handleOwnerDetails(OwnerWithPets ownerWithPets) {
        try {
            // جلب Proprietaire من قاعدة البيانات باستخدام id
            Proprietaire owner = ProprietaireController.getOwnerById(ownerWithPets.getId());
            FXMLLoader loader = new FXMLLoader(getClass().getResource("/org/example/vetcare360/views/OwnerDetails.fxml"));
            Parent root = loader.load();

            OwnerDetailsController controller = loader.getController();
            controller.setOwner(owner);

            Stage stage = new Stage();
            stage.setTitle("Owner Details");
            stage.setScene(new Scene(root));
            stage.show();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
} 