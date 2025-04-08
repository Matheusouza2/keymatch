import { api } from "./api";

export async function store(data) {

    const response = await api.post('/teams', data)
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

export async function addMember(data) {
    const response = await api.post('/teams/members', data)
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

export async function uploadImage(file, team_id) {
    const formData = new FormData();
    formData.append('_method', 'PATCH');
    formData.append('image', file);

    const response = await api.post(`/teams/upload/${team_id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
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