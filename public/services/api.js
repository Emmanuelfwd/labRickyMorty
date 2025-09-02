export async function getPersonajes(status = 'all') {
    let url = 'https://rickandmortyapi.com/api/character';

    
    if (status !== 'all') {
        url += `?status=${status}`;
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener personajes');
        }

        const data = await response.json();
        return data.results; 
    } catch (error) {
        console.error('Error en la API:', error);
        throw error;
    }
}