const ReservationContract = artifacts.require("ReservationContract")

contract("ReservationContract", () => {
    
    before(async ()=>{
        this.reservationContract = await ReservationContract.deployed()
    })


    it('migrate deployed succesfullly', async() => {
        const address = this.reservationContract.address;
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
    })

    it("create a new reservation", async() => {
        const tx = await this.reservationContract.createReservation("Idaira", "01/01/2022", 7, 2);
        const reservationCount = await this.reservationContract.reservationsCounter();
        assert.equal(reservationCount, 1);
    
        const reservation = await this.reservationContract.reservations(0);
        assert.equal(reservation.id, 0);
        assert.equal(reservation.name, "Idaira");
        assert.equal(reservation.start_date, "01/01/2022");
        assert.equal(reservation.amount_days, 7);
        assert.equal(reservation.amount_persons, 2);
    });

    it("modify the number of days for a reservation", async() => {
        const tx = await this.reservationContract.createReservation("Idaira", "01/01/2022", 7, 2); 
        const tx2 = await this.reservationContract.modifyDays(1, 10);
      
        const reservation = await this.reservationContract.reservations(1);
        assert.equal(reservation.amount_days, 10);
    });

    it("modify the number of persons for a reservation", async() => {
        const tx = await this.reservationContract.createReservation("Idaira", "01/01/2022", 7, 2);
        const tx2 = await this.reservationContract.modifyAmountPersons(2, 4);
    
        const reservation = await this.reservationContract.reservations(2);
        assert.equal(reservation.amount_persons, 4);
    });
   
    it("delete a reservation", async() => {
        const tx = await this.reservationContract.createReservation("Idaira", "01/01/2022", 7, 2); 
        const tx2 = await this.reservationContract.deleteReservation(0);
        const reservationCount = await this.reservationContract.reservationsCounter();
        assert.equal(reservationCount, 3);       

        const reservation = await this.reservationContract.reservations(0);
        assert.equal(reservation.id, 0);
        assert.equal(reservation.name, "");
        assert.equal(reservation.start_date, "");
        assert.equal(reservation.amount_days, 0);
        assert.equal(reservation.amount_persons, 0);
    });
})