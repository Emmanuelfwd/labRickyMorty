import { getPersonajes } from "../services/api.js";

const selectStatus = document.getElementById('statusSelect');
const btnBuscar = document.getElementById('buscar');

async function cargarPersonajes() {
    const busqStatus = selectStatus.value;
    try {
        const personajes = await getPersonajes(busqStatus);
        mostrarPersonajes(personajes);
    } catch (error) {
        console.error("Error al obtener personajes:", error);
    }
}

function mostrarPersonajes(personajes) {
    const contenedor = document.getElementById('personajes');
    contenedor.innerHTML = '';

    personajes.forEach(personaje => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta');
        tarjeta.innerHTML = `
            <h2>${personaje.name}</h2>
            <p>Status: ${personaje.status}</p>
            <img src="${personaje.image}" alt="${personaje.name}" />
        `;
        contenedor.appendChild(tarjeta);
    });
}

btnBuscar.addEventListener('click', cargarPersonajes);


cargarPersonajes();