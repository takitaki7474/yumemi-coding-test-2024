import { useEffect, useState} from 'react'
import { Prefecture, fetchPrefectures } from './api/prefectureApi'
import './App.css'
import { fetchPopulations } from './api/populationApi'
import { PopulationGraph } from './PopulationGraph'

function addGraph(prefCode: number) {
  fetchPopulations(prefCode)
    .then(data => {
      console.log("addGraph");
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    })
}

function App() {
  const [checkboxPrefectures, setCheckboxPrefectures] = useState<Prefecture[]>([]);
  const [populationClassification, setPopulationClassification] = useState<string>("総人口");

  useEffect(() => {
    fetchPrefectures()
      .then(data => {
        setCheckboxPrefectures(data.result);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div>
        <label htmlFor="dropdown">Choose an population classification:</label>
        <select id="dropdown" value={populationClassification} onChange={(event) => setPopulationClassification(event.target.value)}>
          <option value="総人口">総人口</option>
          <option value="年少人口">年少人口</option>
          <option value="生産年齢人口">生産年齢人口</option>
          <option value="老年人口">老年人口</option>
        </select>
        <p>Selected Value: {populationClassification}</p>
      </div>
      <h3>Prefectures</h3>
      <div className='prefecture-checkboxes'>
        {checkboxPrefectures.map((pref) => (
          <label>
            <input
              type="checkbox"
              value={pref.prefCode}
              onChange={({target}) => {
                if (target.checked) {
                  addGraph(pref.prefCode);
                }
              }}
            />
            {pref.prefName}
          </label>
        ))}
      </div>
      <PopulationGraph 
        prefCodes={[1,2,3]}
        label={"総人口"}
      />
    </div>
  )
}

export default App
