const URL = "./db/data.json"

let canchas = []
const mostrarHorarios = document.getElementById("horarios")

const nombreInput = document.getElementById("nombre")
const telefonoInput = document.getElementById("telefono")
const tipoCanchaSelect = document.getElementById("tipoCancha")
const horaSelect = document.getElementById("hora")
const botonReservar = document.getElementById("botonReservar")

let fechaSeleccionada = ""
let idEditado = null



function obtenerHorarios() {
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            canchas = data
            renderCanchas(data)
        })
        .catch((err) => console.log("Ocurrió un error", err))
        .finally(() => console.log("Fin de la peticion"))
}

obtenerHorarios()


function renderCanchas(horarioCanchas) {
    mostrarHorarios.innerHTML = ""
    horarioCanchas.forEach(cancha => {
        const card = document.createElement("div")
        card.innerHTML = `<h3>${cancha.tipo}</h3>
                           <p>${cancha.horarios.join(" - ")} horas</p>
                           <span class="precios">${cancha.precios}</span>`
        mostrarHorarios.appendChild(card)
    })
}



function limpiarFormulario() {
    nombreInput.value = ""
    telefonoInput.value = ""
    tipoCanchaSelect.value = ""
    horaSelect.innerHTML = `<option value="">-- Seleccionar hora --<option>`
    fechaSeleccionada = ""
}


function llenarSelectorHorarios(tipo) {
    horaSelect.innerHTML = `<option value="">-- Seleccionar hora --</option>`

    const cancha = canchas.find(c => c.tipo == tipo)
    if (!cancha) {
        return
    }

    const reservasParaEseDia = reservas.filter(r =>
        r.tipoCancha == tipo && r.fecha == fechaSeleccionada
    )

    const horariosOcupados = reservasParaEseDia.map(r => r.hora)

    const horariosDisponibles = cancha.horarios.filter(h =>
        !horariosOcupados.includes(h)
    )

    horariosDisponibles.forEach(horario => {
        const option = document.createElement("option")
        option.value = horario
        option.textContent = horario
        horaSelect.appendChild(option)
    })
}


const { Calendar } = window.VanillaCalendarPro
const options = {
    type: 'default',
    disableDatesPast: true,
    locale: `es-AR`,
    firstWeekday: 0,
    disableDates: [`2025-09-23:2025-09-24`, `2025-10-02`, `2025-11-21`, `2025-12-08`, `2025-12-25`, `2026-01-01:2026-01-02`],
    selectedTheme: `dark`,

    onClickDate(self) {
        fechaSeleccionada = self.context.selectedDates[0]

        const tipoSeleccionado = tipoCanchaSelect.value
        if (tipoSeleccionado) {
            llenarSelectorHorarios(tipoSeleccionado)
        }
    },

}

const calendar = new Calendar('#calendar', options)
calendar.init()


tipoCanchaSelect.addEventListener("change", () => {
    const tipoSeleccionado = tipoCanchaSelect.value
    llenarSelectorHorarios(tipoSeleccionado)
})


nombreInput.addEventListener("input", () => {
    let valor = nombreInput.value
    let nuevoValor = ""

    for (let i = 0; i < valor.length; i++) {
        let letra = valor[i]
        if (
            (letra >= "A" && letra <= "Z") ||
            (letra >= "a" && letra <= "z") ||
            letra === " "
        ) {
            nuevoValor += letra
        }
    }

    nombreInput.value = nuevoValor
})



telefonoInput.addEventListener("input", () => {
    let valor = telefonoInput.value
    let nuevoValor = ""

    for (let i = 0; i < valor.length; i++) {
        let caracter = valor[i]
        if (caracter >= "0" && caracter <= "9") {
            nuevoValor += caracter
        }
    }

    telefonoInput.value = nuevoValor
})





botonReservar.addEventListener("click", () => {
    const nombre = nombreInput.value
    const telefono = telefonoInput.value
    const tipoCancha = tipoCanchaSelect.value
    const hora = horaSelect.value
    const fecha = fechaSeleccionada


    if (!nombre || !telefono || !tipoCancha || !hora || !fechaSeleccionada) {
        Swal.fire({
            icon: "error",
            title: "Informacion incompleta",
            text: "Por favor, completá todos los campos antes de reservar.",
            confirmButtonColor: "#007bff",
            confirmButtonText: "Ok",
            iconColor: `#ff0000`,
            color: `#ffffff`,
            background: `#1e1e1e`
        })
        return
    }

    let precio
    if (tipoCancha == "F5") {
        precio = 25000
    } else {
        precio = 35000
    }

    if (idEditado) {
        let indice = -1
        for (let i = 0; i < reservas.length; i++) {
            if (reservas[i].id == idEditado) {
                indice = i
                break
            }
        }

        if (indice != -1) {
            reservas[indice] = { id: idEditado, nombre, telefono, tipoCancha, fecha, hora, precio }
        }

        idEditado = null
        botonReservar.textContent = "Reservar"

    } else {
        const nuevaReserva = { id: Date.now(), nombre, telefono, tipoCancha, fecha, hora, precio }

        reservas.push(nuevaReserva)
    }


    localStorage.setItem("reservas", JSON.stringify(reservas))

    llenarSelectorHorarios(tipoCancha)
    mostrarReservas()
    editarReserva()

    Swal.fire({
        icon: "success",
        title: "Reserva confirmada",
        text: `Tu reserva fue realizada para el ${fechaSeleccionada} a las ${hora}hs`,
        confirmButtonColor: "#28a745",
        iconColor: `#28a745`,
        color: `#ffffff`,
        background: `#1e1e1e`
    })

    limpiarFormulario()
})

