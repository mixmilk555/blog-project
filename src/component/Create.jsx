import React,{useContext,useState, useEffect} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import BlogPosts from '../context/Context';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Create() {
    const {createBlogs,fade,setFade,setCurrentPage} = useContext(BlogPosts);
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) =>{
        event.preventDefault();
        setFade(false)
        setTimeout(()=>{
            createBlogs(title,content)
            notify()
            setCurrentPage("home")
            navigate("/")
        },1000)
    };
    const handleClick = () =>{
        setFade(false)
        setTimeout(()=>{
            setCurrentPage("home")
            navigate('/')
            notifyCancel()
        },1000)
    };
    const notify = () => toast.success("Create Success.");
    const notifyCancel = () => toast.error("The creation process has been canceled.");
    useEffect(()=>{
        setFade(true)
        return ()=>setFade(false)
    },[]);

  return (
    <div>
        <div className={`container mx-auto p-4 transition-opacity duration-1000 ${fade ? "opacity-100" : "opacity-0"}`}>
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 ">Title</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded break-words"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength="40"
            required
          />
        </div>
        <div className="mb-4 text-center">
          <label className="block text-gray-700 mb-2">Content</label>
          <textarea
            className="w-full px-3 py-2 border rounded break-words max-w-full"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
            required
            style={{ wordBreak: "break-word" }}
          ></textarea>
        </div>
        <div className='mt-4 text-center'>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer ">
        <i className='fas fa-pencil-alt'> Save Post </i>
        </button>
        <button type='button' className="bg-red-400 text-white px-4 py-2 ml-4 rounded hover:bg-red-500 cursor-pointer" onClick={handleClick}>
        <i class="fa fa-times" aria-hidden="true"> Cancel</i>
        </button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Create