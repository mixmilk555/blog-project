import React,{useContext,useState ,useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import BlogPosts from "../context/Context";
import './TitleList.css';

function TitleList() {
    const {blogPosts,likedPosts,toggleLike,setCurrentPage,fade,setFade} = useContext(BlogPosts);
    const [search,setSearch] = useState('');
    const [visibleBooks,setVisibleBooks] = useState(10);
    const navigate = useNavigate();

    const loadMore = () =>{;
        setVisibleBooks(preVis => preVis + 10);
    }

    const handleClick = (id) =>{
        setFade(false);
        setTimeout(()=>{
          setCurrentPage('show');
          navigate(`/show/${id}`)
        },1000)
    };
    const handleSearch = (e) =>{
        setSearch(e.target.value);
    };
    const filteredBook = blogPosts.filter((post) => {
       return post.title.toLowerCase().includes(search.toLowerCase()) || 
        post.content.toLowerCase().includes(search.toLowerCase())
    })

    const handleScroll = () =>{
        if(window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight){
            loadMore();
        }
    };
    useEffect(()=>{
        window.addEventListener("scroll",handleScroll);
        return ()=> window.removeEventListener("scroll",handleScroll);
    },[]);
    useEffect(()=>{
        setFade(true)
        return ()=> setFade(false)
    },[]);

  return (
    <div>
      <div className={`container ${fade ? "opacity-100" : "opacity-0"}`}>
        <input
        type="text"
        placeholder="Search by title or content..."
        value={search}
        onChange={handleSearch}
        className="w-full px-3 py-2 border rounded mb-4"
      />
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {filteredBook.slice(0,visibleBooks).map((post) => (
          <div key={post.id} className="bg-white p-6 shadow rounded border-transparent hover:shadow-lg transform transition duration-300 hover:scale-105 hover:border-4 hover:border-yellow-500 book-item">
            <img
            src={`https://picsum.photos/seed/${post.id}/150/100`}
            alt="post_img"
            className="w-full h-auto mb-4 rounded"
            />
            <h2 className="text-xl font-semibold mb-2 break-words">{post.title}</h2>
            <p className="text-gray-600 mb-4 break-words">
              {post.content.substring(0,100)}...
            </p>
            <button onClick={()=>toggleLike(post.id)}>
            {likedPosts.includes(post.id) ? "💖" : "♡"}
            </button>
            <div className="text-blue-500  hover:underline" onClick={()=>handleClick(post.id)}>Read More</div>
          </div>
        ))}
         </div>
      </div>
    </div>
  );
}

export default TitleList;
