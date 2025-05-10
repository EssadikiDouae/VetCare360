package org.example.vetcare360.controllers;

import javafx.collections.FXCollections;
import javafx.fxml.FXML;
import javafx.scene.control.TableView;
import org.example.vetcare360.models.Proprietaire;
import java.util.List;

public class OwnersListController {
    @FXML
    private TableView<Proprietaire> ownersTable;

    public void loadOwners(String lastName) {
        List<Proprietaire> results = ProprietaireController.searchByLastName(lastName);
        ownersTable.setItems(FXCollections.observableArrayList(results));
    }
} 