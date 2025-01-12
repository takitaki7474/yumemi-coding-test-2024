import { useEffect, useState } from 'react'
import { Prefecture, prefectures } from './api/prefectureApi'
import './App.css'

function App() {
  const [checkboxPrefectures, setCheckboxPrefectures] = useState<Prefecture[]>([]);

  useEffect(() => {
    prefectures()
      .then(data => {
        setCheckboxPrefectures(data.result);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Prefectures</h1>
      <div className='prefecture-checkboxes'>
        {checkboxPrefectures.map((pref) => (
          <p>{pref.prefName}</p>
        ))}
      </div>
    </div>
  )
}

export default App
