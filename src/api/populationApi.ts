const apiKey: string = import.meta.env.VITE_X_API_KEY ?? "";

interface PopulationCompositionResponse {
    message: string;
    reslt: PopulationCompositionPerYear;
}

interface PopulationCompositionPerYear {
    boundaryYear: number;
    data: PopulationCompositionPerYearDataWithLabel[]
}

interface PopulationCompositionPerYearDataWithLabel {
    label: string;
    data: PopulationCompositionPerYearData[]
}

interface PopulationCompositionPerYearData {
    year: number;
    value: number;
    rate: number;
}

const cache: Map<number, PopulationCompositionResponse> = new Map();

const fetchPopulationCompositionPromise = async (prefCode: number): Promise<Map<number, PopulationCompositionResponse>> => {
    const response = await fetch(
        `https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/population/composition/perYear?prefCode=${prefCode}`,
        {
            method: "GET",
            headers: { "X-API-KEY": apiKey }
        }
    );
    const populationResponse: PopulationCompositionResponse = await response.json();
    return new Map<number, PopulationCompositionResponse>([[prefCode, populationResponse]]);
}

export const fetchPopulationComposition = (prefCodes: number[]): Map<number, PopulationCompositionResponse> => {
    
    const promises: Promise<Map<number, PopulationCompositionResponse>>[] = prefCodes
        .filter((prefCode) => !cache.has(prefCode))
        .map((prefCode) => {
            return fetchPopulationCompositionPromise(prefCode);
        });
    promises.forEach((promise) => {
        promise
            .then(data => {
                for (const [key, value] of data.entries()) {
                    cache.set(key, value);
                }
            })
            .catch(err => {
                console.log(err);
            })
    })
    return cache;
}