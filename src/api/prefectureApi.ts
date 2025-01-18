const apiKey: string = import.meta.env.VITE_X_API_KEY ?? "";

interface PrefectureResponse {
  message: string;
  result: Prefecture[];
}
  
export interface Prefecture {
  prefCode: number;
  prefName: string;
}

const fetchPrefecturesPromise = async (): Promise<PrefectureResponse> => {
    const response = await fetch(
        "https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/prefectures",
        {
            method: "GET",
            headers: {
                "X-API-KEY": apiKey,
                "Content-Type": "application/json; charset=UTF-8"
            }
        }
    );
    const prefectureResponse: PrefectureResponse = await response.json();
    return prefectureResponse;
};

export const fetchPrefectures = (): Prefecture[] => {
  fetchPrefecturesPromise()
    .then(data => {
      return data.result;
    })
    .catch(err => {
      console.log(err);
    })
    return [];
}
