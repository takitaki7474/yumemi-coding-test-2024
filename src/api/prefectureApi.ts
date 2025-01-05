const apiKey: string = import.meta.env.VITE_X_API_KEY ?? "";

interface PrefectureResponse {
  message: string;
  result: Prefecture[];
}
  
interface Prefecture {
  prefCode: number;
  prefName: string;
}

export const prefectures = async () => {
    try {
        const response = await fetch(
            "https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/prefectures",
            {
                method: "GET",
                headers: {
                    "X-API-KEY": apiKey,
                    "Content-Type": "application/json; charset=UTF-8"
                }
            }
        )
        const prefectureResponse: PrefectureResponse = await response.json();
        console.log(prefectureResponse);
        return prefectureResponse;
    } catch (err) {
        console.error(err);
    }
};

