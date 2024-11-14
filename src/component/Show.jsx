import React, {useContext ,useEffect} from "react";
import {useParams,useNavigate} from 'react-router-dom';
import BlogPosts from "../context/Context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Show() {
  const { blogPosts, delBlog ,fade,setFade,likedPosts,toggleLike,setCurrentPage,} = useContext(BlogPosts);
  const navigate = useNavigate();
  const {id} = useParams();
  const blogPost = blogPosts.find((blog) => blog.id == id);

    const deleteBook = () => {
        if(confirm('Will you delete this article?') == true){
            setFade(false);
            setTimeout(()=>{
                delBlog(blogPost.id)
                toast.warn('It has been deleted.');
                setCurrentPage('home')
                navigate('/')
            },1000)
        }
    };
    const clickSetCurrentPage = () =>{
        setFade(false);
        setTimeout(()=>{
           setCurrentPage('home')
           navigate('/')
        },1000)
    };
    const clickSetCurrentPageEdit = () =>{
        setFade(false)  
        setTimeout(()=>{    
            setCurrentPage('edit')
            navigate(`/edit/${id}`)
        },1000)
    };

    useEffect(()=>{
        setFade(true)
        return ()=>setFade(false)
    },[]);

  return (
    <div className={`container mx-auto p-4 transition-opacity duration-1000 ${fade ? "opacity-100" : "opacity-0"} bg-yellow-50`}>
        <img
        src={`https://picsum.photos/seed/${blogPost.id}/300/200`}
        alt="book_img"
        className="mx-auto mb-4 rounded"
        />
      <h1 className="text-3xl font-bold mb-6 " >{blogPost.title}</h1>
      <p className="text-xl font-sans" style={{ whiteSpace: 'normal', overflowWrap: 'break-word'}}>{blogPost.content}</p>
        <button onClick={()=>toggleLike(id)}>
        {likedPosts.includes(id) ? "💖" : "♡"}
        </button>
        <div className="mt-4 text-center">
            <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer mr-4 transform transition duration-300 hover:scale-105"
            onClick={clickSetCurrentPageEdit}
            >
           <i className='far fa-edit'> Edit </i>
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer mr-4 transform transition duration-300 hover:scale-105"
            onClick={deleteBook}> <i class="fa fa-trash" aria-hidden="true"> Delete </i></button>
             <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer mt-4 transform transition duration-300 hover:scale-105"
            onClick={clickSetCurrentPage} 
            >
            <i className='fas fa-reply'> Back to List </i>
            </button>
        </div> 
    </div>
  );
}

export default Show;
