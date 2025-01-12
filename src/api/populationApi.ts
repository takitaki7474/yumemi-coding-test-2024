const apiKey: string = import.meta.env.VITE_X_API_KEY ?? "";

interface PopulationCompositionPerYearResponse {
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

export const fetchPopulations = async (prefCode: number): Promise<PopulationCompositionPerYearResponse> => {
    const response = await fetch(
        `https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/population/composition/perYear?prefCode=${prefCode}`,
        {
            method: "GET",
            headers: { "X-API-KEY": apiKey }
        }
    );
    const populationResponse: PopulationCompositionPerYearResponse = await response.json();
    return populationResponse;
}