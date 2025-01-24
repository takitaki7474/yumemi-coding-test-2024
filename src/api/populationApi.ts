const apiKey: string = import.meta.env.VITE_X_API_KEY ?? "";

export interface PopulationCompositionResponse {
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

const fetchPopulationComposition = async (prefCode: number): Promise<Map<number, PopulationCompositionResponse>> => {
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

export const fetchPopulationCompositionsWithCache = (prefCodes: number[]): Promise<Map<number, PopulationCompositionResponse>[]> => {

    const promises: Promise<Map<number, PopulationCompositionResponse>>[] = prefCodes.map(async (prefCode: number) => {
        if (cache.has(prefCode)) {
            return new Map<number,PopulationCompositionResponse>([[prefCode, cache.get(prefCode)!]]);
        }
        const res = await fetchPopulationComposition(prefCode);
        cache.set(prefCode, res.get(prefCode)!);
        return res;
    });

    return Promise.all(promises);
}