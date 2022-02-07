import React from 'react';
import { useState } from 'react'

export default function MonthsRecap({ myData, max }) {
  const mesi = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
  const [selectedMonth, setSelectedMonth] = useState([])
  const [mouseClicked, setMouseClicked] = useState(false)

  //funzione che formatta l'importo in valuta
  const formatToEuro = importo => {
    const str = [...importo.toString()]
    str.splice(-3, 0, ".")
    str.push(' €')
    return str.join('')
  }
  // mostra i dati del mese clickato
  const handleClick = (mese, i) => {
    setSelectedMonth([{ mese, i }])
  }
  // mostra i dati del mese clickato e mi permette di capire che il mouse è premuto
  const handleClickMouseDown = (mese, i) => {
    setSelectedMonth([{ mese, i }])
    setMouseClicked(true)
  }
  //se il tasto del mouse è premuto seleziona gli elementi selezionati
  const handleMouseEnter = (mese, i) => {
    if (mouseClicked && !selectedMonth.map(item => item.mese).includes(mese)) {
      setSelectedMonth([...selectedMonth, { mese, i }])
    }
  }
  //se il tasto del mouse è premuto diseleziona gli elemnti da cui esco
  const handleMouseLeave = (mese, i) => {
    if (mouseClicked && selectedMonth.map(item => item.mese).includes(mese)) {
      setSelectedMonth([...selectedMonth].filter(item => item.mese !== mese))
    }
  }

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <div className='flex select-none mt-5'>
        {myData &&
          myData.map((mese, i) => (
            <div
              key={i}
              onClick={() => handleClick(mese, i)}
              onMouseEnter={() => handleMouseEnter(mese, i)}
              onMouseUp={() => setMouseClicked(false)}
              onMouseDown={() => handleClickMouseDown(mese, i)}
              onMouseLeave={() => handleMouseLeave(mese, i)}
              className="flex flex-col w-[80px] h-[110px] cursor-pointer"
            >
              <div className="mese w-full flex items-center pl-[8px] h-[30%] border border-[#EBEDEE]">
                <h1 className='text-[#0D97D5] text-[12px] font-[500]'>{mesi[i]}</h1>
              </div>
              <div className="data-container relative flex flex-col place-items-start justify-end w-full h-[67%] border border-[#EBEDEE]">
                <p className='text-[#6F7E86] text-[12px] font-[400] z-10 pl-[8px]'>{`${mese.documenti} doc.`}</p>
                <h3 className='text-[#00875A] text-[12px] font-[500] z-10 pl-[8px] pb-[8px]'>{formatToEuro(mese.importo)}</h3>
                <Colonna key={i} max={max} importo={mese.importo} />
              </div>
              <div
                className="selector w-full h-[3%] border border-[#EBEDEE]"
                style={selectedMonth.map(item => item.mese).includes(mese) ? { background: "lime" } : { background: "#0D97D5" }}
              >
              </div>
            </div>
          ))
        }
      </div>

      {/* mostro i dati dei mesi selezionati */}
      <div className='mt-2 flex items-center flex-wrap w-[78%]'>
        {
          selectedMonth && selectedMonth.map(doc => (
            <div className="m-5" key={doc.i}>
              <p className='font-semibold text-sm'>{mesi[doc.i]}</p>
              <h1 className='text-sm text-[#6F7E86]'>Documenti: {doc.mese.documenti}</h1>
              <p className='text-[#00875A] text-sm'>Importo Totale: {formatToEuro(doc.mese.importo)}</p>
            </div>
          ))
        }
      </div>

    </div>
  )
}

//calcolo la percentuale dell'altezza in base alla cifra più grande
const Colonna = ({ max, importo }) => {
  const height = `${Math.floor((97 * importo) / max).toString()}%`
  return (<span style={{ height: height }} className='absolute bottom-0 w-full bg-[#E0F1EB]'></span>)
}