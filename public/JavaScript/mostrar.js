import { getPersonajes,getEpisodesByUrls } from "../services/api.js";

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

async function mostrarPersonajes(personajes) {
    const contenedor = document.getElementById('personajes');
    contenedor.innerHTML = '';

    for (const personaje of personajes) {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta');

        let episodiosHtml = '<p>Cargando episodios...</p>';
        const divEpisodios = document.createElement('div');
        divEpisodios.classList.add('episodios');
        divEpisodios.innerHTML = episodiosHtml;
        tarjeta.innerHTML = `
            <h2>${personaje.name}</h2>
            <p>Status: ${personaje.status}</p>
            <img src="${personaje.image}" alt="${personaje.name}" />
        `;
        tarjeta.appendChild(divEpisodios);
        contenedor.appendChild(tarjeta);
     

        try {
            const episodios = await getEpisodesByUrls(personaje.episode);
            episodiosHtml = `
                <h4>Episodios:</h4>
                <ul>
                    ${episodios.map(ep => `<li>${ep.name} (E${ep.episode})</li>`).join('')}
                </ul>
            `;
        } catch (error) {
            console.error("Error al obtener episodios:", error);
        }
        divEpisodios.innerHTML = episodiosHtml;
    }
}

btnBuscar.addEventListener('click', cargarPersonajes);


cargarPersonajes();