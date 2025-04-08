import { api } from "./api";

export async function setScore(data, matchId) {
    const response = await api.post(`/matches/${matchId}`, data)
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