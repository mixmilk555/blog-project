import React,{useState,useContext,useEffect ,useRef} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import BlogPosts from '../context/Context';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Edit() {
    const {blogPosts,editBlog,fade,setFade} = useContext(BlogPosts);
    const navigate = useNavigate();
    const {id} = useParams();
    const findDataPost = blogPosts.find(content => content.id == id);
    const [editTitle,setEditTitle] = useState(findDataPost.title);
    const [content,setContent] = useState(findDataPost.content);
    const textareaRef = useRef(null);

    const calculateRows = (text) => {
        if (!textareaRef.current) return 1;
        const textareaWidth = textareaRef.current.offsetWidth;
        const fontSize = parseInt(window.getComputedStyle(textareaRef.current).fontSize);
        const charsPerRow = Math.floor(textareaWidth / fontSize); 
        const numberOfRows = Math.ceil(text.length / charsPerRow); 
        return numberOfRows;
      };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setContent(value);
        e.target.style.height = "auto"; 
        e.target.style.height = `${e.target.scrollHeight}px`; 
      };

    const handleSave = (e) =>{
        setFade(false)
        e.preventDefault();
        editBlog(findDataPost.id,content,editTitle)
        setTimeout(()=>{
            toast.success('Successful edit saved')
            navigate(`/show/${id}`)
        },1000)
    }

    useEffect(()=>{
        setFade(true);
        return () => setFade(false);
    },[])

  return (
    <div className={`container mx-auto p-4 transition-opacity duration-1000 ${fade ? "opacity-100" : "opacity-0"}`}>
        <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
        <form onSubmit={handleSave}> 
            <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Title</label>
            <input type="text"
            className="w-full px-3 py-2 border rounded "
            value={editTitle}
            maxLength="40"
            style={{ whiteSpace: 'normal', overflowWrap: 'break-word' }}
            onChange={(e)=>setEditTitle(e.target.value)}
            />
            </div>
            <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Content</label>
            <textarea
            className='w-full px-3 py-2 border rounded'
            value={content}
            style={{ whiteSpace: 'normal', overflowWrap: 'break-word' }}
            rows={calculateRows(content)}
            onInput={handleInputChange}
            ref={textareaRef}
            ></textarea>
            <div className='mt-4 text-center'>
                <button
                type="submit"
                className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-4'
                > 
                <i className="fas fa-save">  Save </i>
                </button>
                <button type="button"
                className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'
                onClick={()=>{ 
                    setFade(false)
                    setTimeout(()=>{
                        navigate(`/show/${id}`)
                    },1000)
                  }} 
                  >
                  <i className="fa fa-times" aria-hidden="true">  Cancel </i>
                </button>
            </div>
            </div>
        </form>
    </div>
  )
}

export default Edit