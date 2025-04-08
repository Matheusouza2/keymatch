import { api } from './api';

export async function consultarUsuarios(data) {

    const response = await api.get(`/users/select2?busca=${data}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
            const errors = error.response.data.errors;

            const flatErrors = Object.fromEntries(
                Object.entries(errors).map(([key, value]) => [key, value[0]])
            );

            return flatErrors;
        });

    return response;
}