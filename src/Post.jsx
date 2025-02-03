<<<<<<< HEAD
import {React, useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import './styles/Post.css'
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markup';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import 'prismjs/prism';

function Post() {
    const [post, setPost] = useState([]);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [tokenCookies, setTokenCookies] = useState(Cookies.get("token"));
    const [loading, setLoading] = useState(true);
    const [commentContent, setCommentContent] = useState("");
    const { id } = useParams();
    useEffect(()=>{
        fetch("https://blog-api-q7yf.onrender.com/posts/" + id).then(r=>r.json()).then(r => {setPost(r), setLoading(false)});
        if(tokenCookies){
              fetch("https://blog-api-q7yf.onrender.com/users/"+ jwtDecode(tokenCookies).id,{
                method: "GET",
                headers: {
                  'Authorization': 'Bearer ' + tokenCookies,
                }
              }).then(r=>r.json()).then(r => {
                if(r.message != "Forbidden")
                  setUser(r)
                }
              );
            }else{
              setUser(null); 
            }
        
    },[])
    function deleteComment(id){
        fetch("https://blog-api-q7yf.onrender.com/comments/"+id,{
            method: "DELETE",
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization' : 'Bearer ' + Cookies.get('token')
            }
        }).then(r=>r.json()).then(r=>navigate(0))
    }
    function handleSubmit(e){
        e.preventDefault();
        if(commentContent.replace(" ", "") == ""){
            console.log("Cant send empty comment")
            return
        }
        fetch("https://blog-api-q7yf.onrender.com/comments",{
              method: "POST",
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : 'Bearer ' + Cookies.get('token')
              },
              body: new URLSearchParams({
                  'userID': user.id,
                  'username': user.username,
                  'content' : commentContent,
                  'postID' : id
              })}
            ).then(r=>r.json()).then(r=>navigate(0))
    }
    return (
        <>
            { loading ?
            <l-hatch
            size="45"
            stroke="4"
            speed="3.5" 
            color="white" 
            ></l-hatch> : 
            <>
                            <div>
                <h1>{post.title}</h1>
                <h3>{new Date(post.date).toLocaleDateString()}</h3>
                <RenderHtml  htmlString={post.content} className="tinymce-content"/>
            </div>
            <hr className="solid"></hr>
            <div className='comments'>
                {
                    user ? 
                    <div className='commentEditor'>
                    <form onSubmit={handleSubmit}>
                        <h2>Drop a comment!</h2>
                        <textarea maxLength={1200} name="commentContent" id="commentContent" value={commentContent} onChange={e=>setCommentContent(e.target.value)} placeholder='Start typing your thoughts here...'></textarea>
                        <button className='publish'>Publish comment</button>
                    </form>
                    </div>
                    :
                    <>
                        <h2>Want to comment? Please log in!</h2>
                        <div className='buttons'>
                            <button onClick={()=>navigate("/sign-up")}>Sign-up</button>
                            <button onClick={()=>navigate("/login")}>Login</button>
                        </div>
                    </>
                    
                }
                
                <h2>{post.comments ? post.comments.length : 0} comments</h2>
                {
                    post.comments ? post.comments.map(c=>{
                        return (
                            <div key={c.id} className='comment'>
                                <h3 className='C_USERNAME'>{c.username}</h3>
                                <h2 className='C_CONTENT'>{c.content}</h2>
                                <h4>{new Date(c.date).toLocaleDateString()}</h4>
                                {
                                    user && (c.userID == user.id || user.admin)? <button className='C_deleteButton' onClick={()=>deleteComment(c.id)}>Delete</button> : null
                                }
                            </div>
                        )
                    }) : null
                }
            </div>
            </>
        }

        </>
    )
}

function RenderHtml({ htmlString }) {
    Prism.highlightAll();
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} className='container'/>;
  }

=======
import {React, useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import './styles/Post.css'
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markup';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import 'prismjs/prism';

function Post() {
    const [post, setPost] = useState([]);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [tokenCookies, setTokenCookies] = useState(Cookies.get("token"));
    const [loading, setLoading] = useState(true);
    const [commentContent, setCommentContent] = useState("");
    const { id } = useParams();
    useEffect(()=>{
        fetch("https://blog-api-q7yf.onrender.com/posts/" + id).then(r=>r.json()).then(r => {setPost(r), setLoading(false)});
        if(tokenCookies){
              fetch("https://blog-api-q7yf.onrender.com/users/"+ jwtDecode(tokenCookies).id,{
                method: "GET",
                headers: {
                  'Authorization': 'Bearer ' + tokenCookies,
                }
              }).then(r=>r.json()).then(r => {
                if(r.message != "Forbidden")
                  setUser(r)
                }
              );
            }else{
              setUser(null); 
            }
        
    },[])
    function deleteComment(id){
        fetch("https://blog-api-q7yf.onrender.com/comments/"+id,{
            method: "DELETE",
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization' : 'Bearer ' + Cookies.get('token')
            }
        }).then(r=>r.json()).then(r=>navigate(0))
    }
    function handleSubmit(e){
        e.preventDefault();
        if(commentContent.replace(" ", "") == ""){
            console.log("Cant send empty comment")
            return
        }
        fetch("https://blog-api-q7yf.onrender.com/comments",{
              method: "POST",
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : 'Bearer ' + Cookies.get('token')
              },
              body: new URLSearchParams({
                  'userID': user.id,
                  'username': user.username,
                  'content' : commentContent,
                  'postID' : id
              })}
            ).then(r=>r.json()).then(r=>navigate(0))
    }
    return (
        <>
            { loading ?
            <l-hatch
            size="45"
            stroke="4"
            speed="3.5" 
            color="white" 
            ></l-hatch> : 
            <>
                            <div className='postContainer'>
                <h1>{post.title}</h1>
                <h3>{new Date(post.date).toLocaleDateString()}</h3>
                <RenderHtml  htmlString={post.content} className="tinymce-content"/>
            </div>
            <hr className="solid"></hr>
            <div className='comments'>
                {
                    user ? 
                    <div className='commentEditor'>
                    <form onSubmit={handleSubmit}>
                        <h2>Drop a comment!</h2>
                        <textarea maxLength={1200} name="commentContent" id="commentContent" value={commentContent} onChange={e=>setCommentContent(e.target.value)} placeholder='Start typing your thoughts here...'></textarea>
                        <button className='publish'>Publish comment</button>
                    </form>
                    </div>
                    :
                    <>
                        <h2>Want to comment? Please log in!</h2>
                        <div className='buttons'>
                            <button onClick={()=>navigate("/sign-up")}>Sign-up</button>
                            <button onClick={()=>navigate("/login")}>Login</button>
                        </div>
                    </>
                    
                }
                
                <h2>{post.comments ? post.comments.length : 0} comments</h2>
                {
                    post.comments ? post.comments.map(c=>{
                        return (
                            <div key={c.id} className='comment'>
                                <h3 className='C_USERNAME'>{c.username}</h3>
                                <h2 className='C_CONTENT'>{c.content}</h2>
                                <h4>{new Date(c.date).toLocaleDateString()}</h4>
                                {
                                    user && (c.userID == user.id || user.admin)? <button className='C_deleteButton' onClick={()=>deleteComment(c.id)}>Delete</button> : null
                                }
                            </div>
                        )
                    }) : null
                }
            </div>
            </>
        }

        </>
    )
}

function RenderHtml({ htmlString }) {
    Prism.highlightAll();
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} className='container'/>;
  }

>>>>>>> c83acae (fix: small css problems fixed)
export default Post