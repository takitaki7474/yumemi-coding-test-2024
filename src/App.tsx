import { useEffect, useState } from 'react'
import { Prefecture, fetchPrefectures } from './api/prefectureApi'
import './App.css'
import { fetchPopulations } from './api/populationApi'

interface GraphValues {
  totalPopulation: GraphValue[];
  youngPopulation: GraphValue[];
  workingAgePopulation: GraphValue[];
  elderlyPopulation: GraphValue[];
}

interface GraphValue {
  prefCode: number;
  x: string;
  y: string;
}

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
  const [graphValues, setGraphValues] = useState<GraphValues>();

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
    </div>
  )
}

export default App
