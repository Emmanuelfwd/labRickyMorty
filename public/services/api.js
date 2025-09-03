export async function getPersonajes(status = 'all') {
    let url = `https://rickandmortyapi.com/api/character${status !== 'all' ? `?status=${status}` : ''}`;
    let allCharacters = [];

    try {
        while (url) {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Error al obtener personajes');
            
            const data = await response.json();
            allCharacters = allCharacters.concat(data.results);
            url = data.info.next; // Siguiente página
        }

        // Filtrar personajes duplicados por id
        const uniqueCharacters = allCharacters.filter((personaje, index, self) =>
            index === self.findIndex(p => p.id === personaje.id)
        );

        return uniqueCharacters;
    } catch (error) {
        console.error('Error al obtener personajes:', error);
        throw error;
    }
}

export async function getEpisodesByUrls(urls) {
    try {
        /* Paso 1: Obtener los IDs de las URLs */
        const ids = [];
        for (let i = 0; i < urls.length; i++) {
            const partes = urls[i].split('/'); /* Separamos la URL por "/" */
            const id = partes[partes.length - 1]; /* Tomamos el último elemento, que es el ID */
            ids.push(id); /* Lo agregamos a la lista de IDs */
        }

        /* Paso 2: Crear la URL final con los IDs */
        const idsEnTexto = ids.join(','); /* Unimos los IDs con comas */
        const urlFinal = 'https://rickandmortyapi.com/api/episode/' + idsEnTexto; /* Construimos la URL de la API */

        /* Paso 3: Hacer la solicitud a la API */
        const respuesta = await fetch(urlFinal);

        /* Paso 4: Verificar si la respuesta fue exitosa */
        if (!respuesta.ok) {
            throw new Error('Error al obtener episodios');
        }

        /* Paso 5: Convertir la respuesta en formato JSON */
        const data = await respuesta.json();

        /* Paso 6: Asegurarnos de que devolvemos siempre un array */
        if (Array.isArray(data)) {
            return data; /* Si ya es un array, lo devolvemos */
        } else {
            return [data]; /* Si es un solo objeto, lo ponemos dentro de un array */
        }

    } catch (error) {
        /* Si ocurre un error en cualquier parte, lo mostramos en consola y lo lanzamos de nuevo */
        console.error('Hubo un error:', error);
        throw error;
    }
}
