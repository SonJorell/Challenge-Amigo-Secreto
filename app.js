// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
let listaDeAmigos = [];
const botonSortear = document.querySelector(".button-draw");

document.getElementById("amigo").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        agregarAmigo();
    }
});

function agregarAmigo() {
    const inputAmigo = document.getElementById("amigo");
    const nombre = inputAmigo.value.trim();

    if (nombre === "") {
        alert("Por favor, ingrese un nombre válido.");
        return;
    }

    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!regex.test(nombre)) {
        alert("Solo se permiten letras y espacios.");
        return;
    }

    if (listaDeAmigos.some(amigo => amigo.toLowerCase() === nombre.toLowerCase())) {
        alert("Ese nombre ya está en la lista.");
        return;
    }

    listaDeAmigos.push(nombre);
    mostrarLista();
    inputAmigo.value = "";
    actualizarEstadoBoton();
    document.getElementById("resultado").innerHTML = "";
}

function mostrarLista() {
    const ulLista = document.getElementById("listaAmigos");
    ulLista.innerHTML = "";

    listaDeAmigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.textContent = "🎉 " + amigo + " ";

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "❌";
        btnEliminar.onclick = () => eliminarAmigo(index);

        li.appendChild(btnEliminar);
        ulLista.appendChild(li);
    });
}

function eliminarAmigo(indice) {
    listaDeAmigos.splice(indice, 1);
    mostrarLista();
    actualizarEstadoBoton();
}

function sortearAmigo() {
    const ulResultado = document.getElementById("resultado");
    ulResultado.innerHTML = "";

    if (listaDeAmigos.length === 0) {
        alert("No hay más amigos para sortear.");
        return;
    }

    let indiceAnimacion = 0;
    const duracionAnimacion = 2000; // Duración total en ms
    const intervaloCambio = 100; // Cada cuánto cambia el nombre

    const liAnimado = document.createElement("li");
    liAnimado.classList.add("animacion");
    ulResultado.appendChild(liAnimado);

    const intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * listaDeAmigos.length);
        liAnimado.textContent = "🎉 " + listaDeAmigos[randomIndex];
    }, intervaloCambio);

    setTimeout(() => {
        clearInterval(intervalId);

        const indiceGanador = Math.floor(Math.random() * listaDeAmigos.length);
        const amigoGanador = listaDeAmigos[indiceGanador];

        liAnimado.textContent = `🎉 El amigo secreto es: ${amigoGanador}`;
        liAnimado.classList.remove("animacion");
        liAnimado.style.color = "#05DF05";

        listaDeAmigos.splice(indiceGanador, 1);
        mostrarLista();
        actualizarEstadoBoton();

        if (listaDeAmigos.length === 0) {
            const liFinal = document.createElement("li");
            liFinal.textContent = "🎯 Todos los amigos ya fueron sorteados";
            liFinal.style.fontWeight = "bold";
            ulResultado.appendChild(liFinal);
        }
    }, duracionAnimacion);
}

function actualizarEstadoBoton() {
    botonSortear.disabled = listaDeAmigos.length === 0;

    if (botonSortear.disabled) {
        botonSortear.style.backgroundColor = "#ccc";
        botonSortear.style.cursor = "not-allowed";
    } else {
        botonSortear.style.backgroundColor = "var(--color-button)";
        botonSortear.style.cursor = "pointer";
    }
}

actualizarEstadoBoton();
