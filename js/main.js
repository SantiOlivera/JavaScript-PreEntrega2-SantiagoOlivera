alert("¡Bienvenido al sistema de reservas!")

function mostrarReserva (dato1, dato2, dato3, dato4, dato5, dato6) {
    console.log("RESERVA:")
    console.log("Nombre y apellido: "+dato1+" - DNI: "+dato2+" - Día: "+dato3+" - Hora: "+dato4+":00hs"+" - Tipo de cancha: "+dato5+" - Precio final: $"+dato6)
    alert("RESERVA REALIZADA CON EXITO")
}

function descuento (precios) {
    let resultado = precios - (10 * precios / 100)

    return resultado
}

function mensajeGracias (usuario) {
    alert("¡Gracias por tu reserva, "+usuario+"!")
}


let turno = prompt("Quiere reservar un turno? (si/no)").toLowerCase()
while (turno == "si") {
    // Les di un valor al principio porque si los declaro dentro de los ifs no se guardan los valores
    let hora = 0
    let tipo = ""
    let precio = 0
    let total = 0

    const horariosF5 = ["16hs", "17hs", "20hs", "21hs"]
    const horariosF7 = ["18hs", "19hs", "22hs", "23hs"]

    alert("Ingrese los siguientes datos")
    let nya = prompt("Nombre y apellido:")
    let dni = parseInt(prompt("DNI:"))
    let dia = parseInt(prompt("Día:"))

    console.log("Precios: Hasta las 20hs el precio es de $22.000 - De las 20hs en adelante el precio es de $32.000")
    alert("ATENCION: ¡LOS TURNOS A PARTIR DE LAS 20HS (INCLUSIVE) TIENEN UN 10% DE DESCUENTO!")


    console.log("1.Futbol 5 / 2.Futbol 7")
    let numCanchas = parseInt(prompt("¿Qué tipo de cancha querés reservar? (1/2)"))
    while (numCanchas != 1 && numCanchas != 2) {
        alert("Error al ingresar el numero")
        numCanchas = parseInt(prompt("¿Qué tipo de cancha querés reservar? (1/2)"))
    }


    if (numCanchas == 1) {
        console.log("Horarios disponibles:")
        for (const cancha of horariosF5){
            console.log(cancha)
        }
        
        hora = parseInt(prompt("Ingrese el horario que quiere reservar (ej: '16')"))
        while (hora != 16 && hora != 17 && hora != 20 && hora != 21) {
            alert("Horario inválido. Los horarios disponibles son: 16, 17, 20, 21")
            hora = parseInt(prompt("Ingrese el horario que quiere reservar (ej: '16')"))
        }

        tipo = "Futbol 5"

    } else {
        console.log("Horarios disponibles:")
        for (const cancha of horariosF7) {
            console.log(cancha)
        }

        hora = parseInt(prompt("Ingrese el horario que quiere reservar (ej: '18')"))
        while (hora != 18 && hora != 19 && hora != 22 && hora != 23) {
            alert("Horario inválido. Los horarios disponibles son: 18, 19, 22, 23")
            hora = parseInt(prompt("Ingrese el horario que quiere reservar (ej: '18')"))
        }

        tipo = "Futbol 7"
    }
    

    if (hora >= 16 && hora < 20) {
       total = 22000

    } else if (hora >= 20) {
        precio = 32000

        total = descuento(precio)
    }

    mostrarReserva (nya, dni, dia, hora, tipo, total)
    mensajeGracias (nya)

    turno = prompt("Quiere reservar otro turno? (si/no)").toLowerCase()
}