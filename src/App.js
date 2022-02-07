import './App.css';
import { useState, useEffect } from 'react'
import MontsRecap from './components/MonthsRecap';

function App() {

  const [myData, setMyData] = useState([])

  useEffect(() =>{
     
    const FetchData = async () => {
         const data = await fetch('http://staccah.fattureincloud.it/testfrontend/data.json');
         const res = await data.json()

         setMyData(res.mesi)
    }

   FetchData()
  }, [])

  const importi = myData.map(item => item.importo)
  const max = Math.max(...importi)

  return (
    <div className="App">
       <MontsRecap myData={myData} max={max} />
    </div>
  );
}

export default App;
