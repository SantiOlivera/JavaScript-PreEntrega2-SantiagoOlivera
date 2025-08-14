const canchas = [
    {
        id: 1,
        tipo: "F5",
        horarios: ["16:00", "17:00", "20:00", "21:00"]
    },
    {
        id: 2,
        tipo: "F7",
        horarios: ["18:00","19:00", "22:00", "23:00"]
    },
]

let reservas = JSON.parse(localStorage.getItem("reservas")) || []


let mostrarHorarios = document.getElementById("horarios")
let listado = document.getElementById("listado")
let botonReservar = document.getElementById("botonReservar")
let botonBorrarReservas = document.getElementById("botonBorrarReservas")


function renderCanchas(horarioCanchas) {
    mostrarHorarios.innerHTML = ""
    horarioCanchas.forEach(cancha => {
        const carta = document.createElement("div")
        carta.innerHTML = `<h3>${cancha.tipo}</h3>
                           <p>${cancha.horarios.join(" - ")} horas</p>`
        mostrarHorarios.appendChild(carta)
    })
}

renderCanchas(canchas)


function mostrarReservas () {
    listado.innerHTML = ""
    reservas.forEach (reserva => {
        const div = document.createElement("div")
        div.innerHTML = `<li>Nombre y Apellido: ${reserva.nombre}</li>
                         <li>Telefono: ${reserva.telefono}</li>
                         <li>Tipo: ${reserva.tipoCancha}</li>
                         <li>Fecha: ${reserva.fecha}</li>
                         <li>Hora: ${reserva.hora}</li>`
        listado.appendChild(div)
    })
}


botonReservar.addEventListener("click", () => {
    let nombre = document.getElementById("nombre").value
    let telefono = document.getElementById("telefono").value
    let tipoCancha = document.getElementById("tipoCancha").value
    let fecha = document.getElementById("fecha").value
    let hora = document.getElementById("hora").value

    reservas.push({nombre, telefono, tipoCancha, fecha, hora})

    localStorage.setItem("reservas", JSON.stringify(reservas))

    horariosActualizados(tipoCancha, hora)

    renderCanchas(canchas)
    mostrarReservas()
})



function horariosActualizados(tipo, hora) {
    canchas.forEach(cancha => {
        if (cancha.tipo == tipo) {
            cancha.horarios = cancha.horarios.filter(horario => horario != hora)
        }
    })
}


mostrarReservas()


botonBorrarReservas.addEventListener ("click", () => {
    reservas = []
    localStorage.removeItem("reservas")
    listado.innerHTML = ""
})
