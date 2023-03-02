App = {
    contracts: {}, 
    init:  async () => {
     await App.loadEthereum()
     await App.loadAccount()
     await App.loadContracts()
     await App.render()
     await App.renderReservations()
    },
    loadEthereum: async () => {
      if (window.ethereum) {
        App.web3Provider = window.ethereum;
        await window.ethereum.request({ method: "eth_requestAccounts" })
      } else {
        console.log(
          "No ethereum browser is installed. Try it installing MetaMask "
        )
      }
    },

    loadAccount: async () => {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        console.log(accounts)
        App.account = accounts[0]
    },

    loadContracts: async () => {
        const res = await fetch("ReservationContract.json")
        const reservationsContractJSON = await res.json()
        console.log(reservationsContractJSON)

        App.contracts.reservationsContract = TruffleContract(reservationsContractJSON)
        App.contracts.reservationsContract.setProvider(App.web3Provider)
        App.reservationsContract = await App.contracts.reservationsContract.deployed()
    },

    render: () => {
        document.getElementById('account').innerText = App.account
    },

    renderReservations: async () =>{
        const reservationCounter = await App.reservationsContract.reservationsCounter()
        const reservationCounterNumber = reservationCounter.toNumber()
        console.log(reservationCounterNumber)

        let html = "";

        let reservationElement = `<div class="card bg-dark rounded-0 mb-2">
        <div class="card-header d-flex justify-content-between align-items-center">
        Hay ${reservationCounterNumber} reservas  </div>
        </div>`
        html += reservationElement;

        for(let i = 0; i < reservationCounterNumber; i++){
            const reservation = await App.reservationsContract.reservations(i)
            const id = reservation[0]
            const name = reservation[1]
            const start_date = reservation[2]
            const amount_days = reservation[3]
            const amount_persons = reservation[4]

            
            let reservationElement = `<div class="card bg-dark rounded-0 mb-2">
            <div class="card-header d-flex justify-content-between align-items-center">
              <span>Reserva ${id}</span>
            </div>
            <div class="card-body">
              <p> Name: ${name}</p>
              <p> Check-in: ${start_date}</p>
              <p> Amount of days: ${amount_days}</p>
              <p> Amount of persons: ${amount_persons}</p>
            </div>
          </div>`;
          html += reservationElement;
        }
        document.querySelector('#reservationsList').innerHTML = html;
    },

    createReservation: async(name, start_date, amount_days, amount_persons)  => {
          const result = await App.reservationsContract.createReservation(name, start_date, amount_days, amount_persons, {
            from: App.account,
          })
        
    }, 

    delete: async(id)  => {
        const result = await App.reservationsContract.deleteReservation(id, {
          from: App.account,
        })
        window.location.reload();
    },

    change_days: async(id, days)  => {
        const result = await App.reservationsContract.modifyDays(id, days, {
          from: App.account,
        })
        window.location.reload();
    }
      
  }


