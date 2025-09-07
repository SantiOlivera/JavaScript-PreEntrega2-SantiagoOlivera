const listado = document.getElementById("listado")
let reservas = JSON.parse(localStorage.getItem("reservas")) || []

function mostrarReservas() {
    listado.innerHTML = ""
    reservas.forEach(reserva => {
        const card = document.createElement("div")
        card.innerHTML = `<li>Nombre y Apellido: ${reserva.nombre}</li>
                         <li>Telefono: ${reserva.telefono}</li>
                         <li>Tipo: ${reserva.tipoCancha}</li>
                         <li>Fecha: ${reserva.fecha}</li>
                         <li>Hora: ${reserva.hora}</li>
                         <li>Precio: $${reserva.precio}</li>
                         <button class="botonEditar" id="${reserva.id}">Editar</button>
                         <button class="botonBorrar" id="${reserva.id}">Borrar</button>`
        listado.appendChild(card)
        editarReserva()
        borrarReserva()
    })
}


function editarReserva() {
    const botonesEditar = document.querySelectorAll(".botonEditar")
    botonesEditar.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const id = e.currentTarget.id
            const reservaBuscada = reservas.find(reserva => reserva.id == id)

            Swal.fire({
                title: '¿Querés editar esta reserva?',
                text: `Reserva para ${reservaBuscada.nombre} a las ${reservaBuscada.hora}hs`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Sí, editar',
                confirmButtonColor: `#e0a800`,
                cancelButtonText: 'Cancelar',
                iconColor: `#FFD700`,
                color: `#ffffff`,
                background: `#1e1e1e`
            }).then((result) => {
                if (result.isConfirmed) {
                    nombreInput.value = reservaBuscada.nombre
                    telefonoInput.value = reservaBuscada.telefono
                    tipoCanchaSelect.value = reservaBuscada.tipoCancha
                    fechaSeleccionada = reservaBuscada.fecha
                    llenarSelectorHorarios(reservaBuscada.tipoCancha)
                    horaSelect.value = ""

                    idEditado = id
                    botonReservar.textContent = "Guardar cambios"
                }
            })
        })
    })
}


function borrarReserva() {
    const botonesBorrar = document.querySelectorAll(".botonBorrar")
    botonesBorrar.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const id = e.currentTarget.id
            const reservaBuscada = reservas.find(reserva => reserva.id == id)

            Swal.fire({
                title: '¿Seguro que querés borrar esta reserva?',
                text: `Reserva para ${reservaBuscada.nombre} a las ${reservaBuscada.hora}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, borrar',
                confirmButtonColor: `#8B0000`,
                cancelButtonText: 'Cancelar',
                iconColor: `#FFD700`,
                color: `#ffffff`,
                background: `#1e1e1e`
            }).then((result) => {
                if (result.isConfirmed) {
                    reservas = reservas.filter(reserva => reserva.id != id)

                    localStorage.setItem("reservas", JSON.stringify(reservas))

                    mostrarReservas()
                }
            })
        })
    })
}


mostrarReservas()
