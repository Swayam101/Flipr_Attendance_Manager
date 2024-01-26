import React, { useEffect, useState } from 'react'
import useSocketContext from '../contexts/SocketStore.js'
import { QrReader } from 'react-qr-reader'
import { toast } from 'react-toastify'

const QrCode = () => {
  
  const [data, setData] = useState('No result');
  

  return (
    <div >
      <QrReader
      onResult={(result,error)=>{
        if(error) console.log(error);
        // setData(result.getText())
      

      }}
      />
      <h1>{data}</h1>
    </div>
  )
}

export default QrCode
