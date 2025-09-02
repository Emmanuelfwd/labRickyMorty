export async function getPersonajes(status = 'all') {
    const url = `https://rickandmortyapi.com/api/character${status !== 'all' ? `?status=${status}` : ''}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error al obtener personajes');
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
        throw error;
    }
}