/**
 * Created by adla on 21.6.16.
 */

'use strict';

var app = angular.module('employeeTable', ['ngMaterial', 'ngMessages']);

app.controller('employeesController', function($scope, $mdDialog){

    var actualDate = new Date();
    var depositData = {};

    $scope.addIcon    = "img/icons/add.svg";
    $scope.cancelIcon = "img/icons/cancel.svg";
    $scope.deleteIcon = "img/icons/delete.svg";

    $scope.inputsDisabled = [];
    $scope.editIcon = [];
    $scope.addNewEmployeeData = {};
    $scope.disabledDateOfEnd = true;
    $scope.reverse = false;
    $scope.orderProp = "";
    $scope.addNewEmployeeData.indefiniteperiod = "no";

    var dateofbirth1 = new Date("1996-07-11"); // only for testing
    var dateofbirth2 = new Date("1993-09-11");
    var dateofbirth3 = new Date("1997-10-11");
    var dateofstart1 = new Date("2013-10-08");
    var dateofstart2 = new Date("2015-12-17");
    var dateofstart3 = new Date("2016-05-15");
    var dateofend1   = new Date("2017-01-01");

    $scope.employees = [{ // only for testing
        "id": 0,
        "name": "Adam",
        "surname": "Lasak",
        "position": "programmer",
        "dateofbirth": dateofbirth1,
        "dateofstart": dateofstart1,
        "dateofend": "",
        "indefiniteperiod": "no"
    }, {
        "id": 1,
        "name": "Tomáš",
        "surname": "Jedno",
        "position": "manager",
        "dateofbirth": dateofbirth2,
        "dateofstart": dateofstart2,
        "dateofend": "",
        "indefiniteperiod": "no"
    }, {
        "id": 2,
        "name": "Prokop",
        "surname": "Tunel",
        "position": "designer",
        "dateofbirth": dateofbirth3,
        "dateofstart": dateofstart3,
        "dateofend": dateofend1,
        "indefiniteperiod": "yes"
    }];

    // initialize all inputs to disabled, its array, each line has current index
    // initialize edit icon witch will be changed to save icon when user click on edit
    for (var i = 0; i < $scope.employees.length; i++) {
        $scope.inputsDisabled[i] = true;
        $scope.editIcon[i] = "img/icons/edit.svg";
    }

    //------------------------------------------------------------

    $scope.changeInputsDisabled = function( _index ){
        $scope.inputsDisabled[_index] = !$scope.inputsDisabled[_index];
    };

    $scope.changeDateOfEndDisabled = function(){
        $scope.disabledDateOfEnd = !$scope.disabledDateOfEnd;
    };

    $scope.changeReverse = function(){
        $scope.reverse = !$scope.reverse;
    };

    $scope.addEmployee = function(){

        if ($scope.addNewEmployeeData.dateofbirth != null) {

            $scope.addNewEmployeeData.id = $scope.employees.length + 1;

            $scope.employees.push($scope.addNewEmployeeData);
            $scope.editIcon.push("img/icons/edit.svg");
            $scope.inputsDisabled.push( true );

            $scope.resetAddForm(); // reset to default values

        } else $scope.showAlert("", "Enter date of birth.");

    };

    $scope.deleteEmployer = function( _id ){

        for (var i = 0; i < $scope.employees.length; i++) {
            if ($scope.employees[i].id == _id) {
                $scope.employees.splice(i, 1);
                $scope.inputsDisabled.splice(i, 1);
                $scope.editIcon.pop();
            }
        }

    };

    $scope.editEmployer = function( _index ){

        if ($scope.inputsDisabled[_index] == false)
            $scope.editIcon[_index] = "img/icons/edit.svg";
        else
            $scope.editIcon[_index] = "img/icons/save.svg";

        if ($scope.employees[_index] != depositData) {
            depositData = {};
            angular.copy($scope.employees[_index], depositData);
        }

    };

    $scope.cancelEdit = function( _index ){

        if ($scope.inputsDisabled[_index] == false) {
            $scope.employees[_index] = depositData;
            depositData = {};
            angular.copy($scope.employees[_index], depositData);
        }

    };

    $scope.resetAddForm = function(){

        $scope.addNewEmployeeData = {};
        $scope.addNewEmployeeData.indefiniteperiod = "no";
        $scope.disabledDateOfEnd = true;

    };

    $scope.showAlert = function( title, string ) {

        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title(title)
                .textContent(string)
                .ariaLabel('Alert Dialog')
                .ok('OK')
        );

    };

    $scope.showConfirm = function( question, sentence, _index ) {

        var confirm = $mdDialog.confirm()
            .title(question)
            .textContent(sentence)
            .ariaLabel('Lucky day')
            .ok('Yes')
            .cancel('No');
        $mdDialog.show(confirm).then(function() {
            $scope.deleteEmployer( _index );
        }, function() {
            // nothing todo
        });

    };

    //------------------------------------------------------------

    // ADD row
    $scope.maxDateOfBirth = new Date(
        actualDate.getFullYear(),
        actualDate.getMonth(),
        actualDate.getDate());

    $scope.newMinDateOfStart = function(){
        if ($scope.addNewEmployeeData.dateofbirth != null)
            $scope.minDateOfStart = $scope.addNewEmployeeData.dateofbirth;
    };

    $scope.newMaxDateOfBirth = function(){
        if ($scope.addNewEmployeeData.dateofstart != null)
            $scope.maxDateOfBirth = $scope.addNewEmployeeData.dateofstart;
    };

    $scope.newMinDateOfEnd = function(){
        if ($scope.addNewEmployeeData.dateofstart == null) {
            $scope.addNewEmployeeData.dateofend = null;
            $scope.showAlert("", "First, you have to type Date Of Start.");
        } else {
            var tmpDateOfStart = $scope.addNewEmployeeData.dateofstart;
            $scope.minDateOfEnd = new Date(
                tmpDateOfStart.getFullYear(),
                tmpDateOfStart.getMonth(),
                tmpDateOfStart.getDate() + 1
            );
        }
    };

    $scope.changeDateOfEnd = function(){
        if ($scope.addNewEmployeeData.indefiniteperiod == "no")
            $scope.addNewEmployeeData.dateofend = null;
    };

});
