const reservationForm = document.querySelector("#reservationForm")
const deleteForm = document.querySelector("#deleteForm")
const changeDaysForm = document.querySelector("#changeDaysForm")

document.addEventListener("DOMContentLoaded", () => {
    App.init()
})

reservationForm.addEventListener("submit", e =>{
    e.preventDefault()

    console.log(
        reservationForm["name"].value,
        reservationForm["start_date"].value,
        reservationForm["amount_days"].value,
        reservationForm["amount_persons"].value
    )
  const name = reservationForm["name"].value
  const start_date = reservationForm["start_date"].value
  const amount_days = reservationForm["amount_days"].value
  const amount_persons = reservationForm["amount_persons"].value
  App.createReservation(name, start_date, amount_days, amount_persons)
})

