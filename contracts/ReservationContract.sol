// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract ReservationContract {
    uint public reservationsCounter = 0;
    uint256 public reservationsID = 0;

    struct Reservation {
        uint256 id;
        string name;
        string start_date;
        uint amount_days;
        uint amount_persons;
    }

    mapping(uint256 => Reservation) public reservations;


    function createReservation(string memory _name, string memory _start_date, uint _amount_days, uint _amount_persons) public{
      reservations[reservationsCounter] = Reservation(reservationsID, _name, _start_date, _amount_days, _amount_persons);
      reservationsID++;
      reservationsCounter++;
    }

    function deleteReservation(uint256 _id) public {
        delete reservations[_id];
        reservationsCounter--;
    }

    function modifyDays(uint256 _id, uint _amount_days) public {
        require(reservations[_id].id == _id, "Reservation not found");
        reservations[_id].amount_days = _amount_days;
    }

    function modifyAmountPersons(uint256 _id, uint _amount_persons) public {
        require(reservations[_id].id == _id, "Reservation not found");
        reservations[_id].amount_persons = _amount_persons;
    }
 
}