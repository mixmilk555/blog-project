import {useContext, useEffect} from "react";
import {Routes,Route,useNavigate} from 'react-router-dom'
import "./App.css";
import TitleList from "./component/TitleList";
import Create from "./component/Create";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlogPosts from "./context/Context";
import Show from "./component/Show";
import Edit from "./component/Edit";

function App() {
  const {setSortBy,currentPage,setCurrentPage,fade,setFade} = useContext(BlogPosts)
  const navigate = useNavigate();

  const checkClick = () => {
    setFade(false)
    setTimeout(()=>{
      setCurrentPage("create")
      navigate('/create')
    },1000)
  };
  const handleSortChange =(e)=>{
    setSortBy(e.target.value)
  };

  useEffect(()=>{
    setFade(true)
    return ()=> setFade(false)
  },[currentPage]);

  return (
    <div className={`transition-opacity duration-1000 ${fade ? "opacity-100" : "opacity-0"} bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen p-4 mali-regular`} >
      <div className={`container mx-auto p-4`} >
        {currentPage === 'home' &&
      <div className="flex justify-center items-center mb-6 relative">
          <h1 className="text-3xl font-bold font-serif">Blog Posts</h1>
          <div className="absolute right-0 mb-4">
          <label>Sort By: </label>
              <select 
                className="border border-gray-300 rounded px-3 py-2"
                onChange={handleSortChange}
              >
                <option value="id">ID</option>
                <option value="title">Title</option>
                <option value="likes">Likes</option>
              </select>
            </div>
          <div className=" w-full fixed bottom-0 flex justify-center z-50 ">
            <div className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer  w-[15%] mx-auto text-center" onClick={checkClick} >
           <i className='far fa-keyboard '></i>   Create New Post
            </div>
          </div>
        </div>
        }
      </div>
      <Routes>
        <Route path="/" element={<TitleList/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/show/:id" element={<Show/>}/>
        <Route path="edit/:id" element={<Edit/>}/>
       </Routes>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
        />
    </div>
  );
}

export default App;
