import { useEffect, useState} from 'react'
import { Prefecture, fetchPrefectures } from './api/prefectureApi'
import './App.css'
import { PopulationGraph } from './PopulationGraph'

function App() {
  const [prefCheckboxes, setPrefCheckboxes] = useState<Prefecture[]>([]);
  const [checkedPopulationClass, setCheckedPopulationClass] = useState<string>("総人口");
  const [checkedPrefeCodes, setCheckedPrefCodes] = useState<number[]>([]);

  useEffect(() => {
    setPrefCheckboxes(fetchPrefectures());
  }, []);

  return (
    <div>
      <div>
        <label htmlFor="dropdown">Choose an population classification: </label>
        <select id="dropdown" value={checkedPopulationClass} onChange={(event) => setCheckedPopulationClass(event.target.value)}>
          <option value="総人口">総人口</option>
          <option value="年少人口">年少人口</option>
          <option value="生産年齢人口">生産年齢人口</option>
          <option value="老年人口">老年人口</option>
        </select>
      </div>
      <div className='prefecture-checkboxes'>
        {prefCheckboxes.map((pref) => (
          <label>
            <input
              type="checkbox"
              value={pref.prefCode}
              onChange={({target}) => {
                if (target.checked) {
                  setCheckedPrefCodes((v) => [...v, pref.prefCode]);
                } else {
                  setCheckedPrefCodes((v) => v.filter((item) => item !== pref.prefCode));
                }
              }}
            />
            {pref.prefName}
          </label>
        ))}
      </div>
      <PopulationGraph 
        prefCodes={checkedPrefeCodes}
        label={checkedPopulationClass}
      />
    </div>
  )
}

export default App
