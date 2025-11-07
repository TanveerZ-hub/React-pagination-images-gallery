import axios from "axios"
import { useEffect, useState } from "react";

const App = () => {
  const [userData, setUserData] = useState([]);
  const [index, setindex] = useState(1);

  const getData = async () => {
    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=15`)
    setUserData(response.data)
    console.log(response.data)
  }
  useEffect(function () {
    getData()
  }, [index])


  let printUserData = <h3 className=" absolute top-[45%] left-[42%] md:left-[48%] font-bold mr-2 ">Loading...</h3>;
  if (userData.length > 0) {
    printUserData = userData.map(function (elem, idx) {
      return (
        <div className="m-auto justify-center items-center" key={idx}>
          <a href={elem.url} target="_blank">
            <div className="m-auto mt-4">
              <img
                className="h-16 w-24 md:h-44 md:w-56 object-cover rounded-2xl"
                src={elem.download_url}
                alt=""
              />
              <h1 className="pl-2 font-bold text-[5px] md:text-xs">Clicked by: {elem.author}</h1>
            </div>
          </a>
        </div>
      );
    });
  } 
  return (
    <div className='bg-black text-white h-screen '>
      <h1 className="font-bold pt-2.5 text-3xl text-amber-300 text-center ">Gallery</h1>
      <div className="flex flex-wrap h-[73%] w-[70%] overflow-auto scrollbar-hide m-auto rounded-2xl bg-[#2b2b2b] mt-7 gap-3">
        {printUserData}
      </div>
      
      <div className="flex justify-center items-center mx-4 gap-2">
        <button style={{ opacity: index == 1 ? 0.5 : 1 }} className="bg-[#383838] px-2.5 py-1 md:px-10 md:py-2 rounded text-2xl active:scale-95 active:bg-[#474745] cursor-pointer mt-2"
          onClick={function () {

            if (index > 1) {
              setUserData([])
              setindex(index - 1)
            }
          }}
        >Prev</button>

        <h1 className="text-xl py-1 md:py-2 px-2 mt-2.5  rounded text-black bg-amber-400">Page {index} </h1>
        <button className="bg-[#383838] px-2.5 py-1 md:px-10 md:py-2 rounded text-2xl active:scale-95 active:bg-[#474745] cursor-pointer mt-2"
          onClick={function () {
            setUserData([])
            setindex(index + 1)

          }}
        >Next</button>


      </div>
    </div>
  )
}

export default App
