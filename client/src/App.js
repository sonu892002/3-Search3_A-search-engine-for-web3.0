import './App.css'
import axios from 'axios'
import { useState } from 'react'

function App() {
  const [search, setsearch] = useState('')
  const [data, setdata] = useState([])
  const clicked = (data) => {
    //useEffect(() => {
    axios.get(`http://localhost:5000/${search}`).then((res) => {
      console.log(res.data)
      setdata(res.data)
    })
    //}, [])
  }

  return (
    <div className="App">
      <div className="navbar">
        <div className="logo">Search3</div>
        <div className="inputbar">
          <input
            type="text"
            placeholder="search here..."
            onChange={(e) => {
              setsearch(e.target.value)
            }}
          />
          <button onClick={clicked}>search</button>
        </div>
      </div>

      <div className="displayholder">
        <div className="display">
          {data.map((x, key) => {
            return (
              <div className="displayitem" key={key}>
                {x.aboveUrlText}
                <br></br>

                <a href={x.linkText} target="_blank">
                  {x.linkdataText}
                </a>

                <br></br>

                {x.dataText}
                <br></br>
              </div>
            )
          })}
        </div>

        <div className="displayinfo">
          <div className="diitem">
            <div className="iihd">About</div>
            <div className="iih">
              This is the worlds first web-3 search engine.<br></br> Search3 is
              the gateway to the web 3.0 internet. <br />
              Search your web 3 related queries here.<br></br>
              --SOURADEEP KUNDU
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
