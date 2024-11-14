import React,{createContext,useState,useEffect} from 'react';
import axios from 'axios';

const BlogPosts = createContext();

function Provider({children}) {
    const [blogPosts  , setBlogPosts  ] = useState([]);
    const [fade,setFade] = useState(false);
    const [likedPosts, setLikedPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState("home");
    const [sortBy,setSortBy] = useState('id');


    const getListBlogs = async() =>{
        const listBlogs =   await axios.get('http://localhost:3001/book')
        setBlogPosts(listBlogs.data)
        setLikedPosts(listBlogs.data.filter(post=> post.isLike == true).map(post => post.id))
        };

    const createBlogs = async(title,content) =>{
        const blogs = await axios.post('http://localhost:3001/book',{
            title : title,
            content:content,
            isLike:false
        })
        setBlogPosts([...blogPosts,blogs.data])
    };
    const delBlog = async(id) =>{
            await axios.delete('http://localhost:3001/book/'+id)
            setBlogPosts(blogPosts.filter((post => post.id !== id)))
    };

    const editBlog = async(id,content,title) =>{
            const newContent = await axios.put("http://localhost:3001/book/"+id,{
                    title: title,
                    content:content
            })
            console.log(newContent)
            setBlogPosts(blogPosts.map(item => item.id == id? {...item,...newContent.data} : item))
    };
    
    
    const sortBlog = (blogs) =>{
        let sortedBlog ;
        if(sortBy === "title"){
            sortedBlog =  [...blogs].sort((a,b) => a.title.localeCompare(b.title))
        }else if(sortBy === "likes"){
            sortedBlog = [...blogs].sort((a,b) => (b.isLike? 1 :-1)-(a.isLike? 1: -1) )
        }else if(sortBy === "id"){
            sortedBlog = [...blogs].sort((a,b)=>  String(a.id).localeCompare(String(b.id)))
        }
        return sortedBlog
    };


    const toggleLike = async(id) =>{
        const post = blogPosts.find((p)=> p.id == id)
        const isLike = !post.isLike
        const updateLike = {
            ...post,isLike : isLike
        };
        await axios.patch("http://localhost:3001/book/"+id,updateLike)

        setBlogPosts((prevBooks) => prevBooks.map((book) => (book.id === id ? updateLike : book)));
   
        if(isLike){
            setLikedPosts((prevLike) => [...prevLike,id])
        }else{
            setLikedPosts((prevLike) => prevLike.filter((postId) => postId !== id));
        }
    };

    useEffect(()=>{
       getListBlogs()
    },[]);   

    useEffect(()=>{
            setBlogPosts((prevBooks)=>  sortBlog(prevBooks)) 
      },[sortBy,likedPosts]);

    const context = {
        blogPosts,
        createBlogs,
        delBlog,
        editBlog,
        fade,
        setFade,
        likedPosts,
        toggleLike,
        sortBlog,
        setSortBy,
        currentPage,
        setCurrentPage
    };
  return (
    <BlogPosts.Provider value={context}>{children}</BlogPosts.Provider>
  )
};

export {Provider}
export default BlogPosts;