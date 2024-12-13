import Editor from './Editor.jsx';
import {React, useEffect, useState} from 'react'
import { useNavigate, useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import './styles/PostEditor.css'

function PostEditor() {
  const [content, setContent] = useState('');
  const [initialValue, setInitialValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const { id } = useParams();
  const [tokenCookies, setTokenCookies] = useState(Cookies.get("token"));
  const navigate = useNavigate();

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };
  function onCreate(){
    setLoading(true);
    console.log(title);
    console.log(content);
    console.log(isPublic);
    fetch("https://blog-api-q7yf.onrender.com/posts/private",{
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization' : 'Bearer ' + Cookies.get('token')
      },
      body: new URLSearchParams({
          'title': title,
          'content': content,
          'public' : isPublic
      })
    }).then(r=>{
      r.json()
    }).then(r=>{navigate("/");})
  }

  function onUpdate(){
    setLoading(true);
    console.log(title);
    console.log(content);
    console.log(isPublic);
    fetch("https://blog-api-q7yf.onrender.com/posts/private/" + id,{
      method: "PUT",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization' : 'Bearer ' + Cookies.get('token')
      },
      body: new URLSearchParams({
          'title': title,
          'content': content,
          'public' : isPublic
      })
    }).then(r=>{
      r.json()
    }).then(r=>{navigate("/");})
  }
  function onDelete(){
    setLoading(true);
    fetch("https://blog-api-q7yf.onrender.com/posts/private/" + id,{
      method: "DELETE",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization' : 'Bearer ' + Cookies.get('token')
      },
    }).then(r=>{
      r.json()
    }).then(r=>{navigate("/");})
  }

  useEffect(()=>{
     if(tokenCookies){
          fetch("https://blog-api-q7yf.onrender.com/users/"+ jwtDecode(tokenCookies).id,{
            method: "GET",
            headers: {
              'Authorization': 'Bearer ' + tokenCookies,
            }
          }).then(r=>r.json()).then(r => {
            console.log(r)
            if(r.message == "Forbidden" || !r.admin){ 
              navigate("/") 
            }  
          }
          )
        }else{
          navigate("/") 
      }
    if(id){
      console.log("id: " + id);
      fetch("https://blog-api-q7yf.onrender.com/posts/" + id).then(r=>r.json()).then(r => {console.log(r), setTitle(r.title), setContent(r.content), setInitialValue(r.content), setIsPublic(r.public)});
    }else{
      console.log("no id");
    }
  },[])

  return (
    <>
        {id ? <h1>Edit Post</h1> : <h1>Create a new Post</h1>}
        {loading ? <l-hatch
        size="45"
        stroke="4"
        speed="3.5" 
        color="white" 
        ></l-hatch> : null}
        <div className='content'>
          <div className='inputs'>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={(e)=>setTitle(e.target.value)} value={title}/>
          </div>
          <div className='inputs'>
            <label htmlFor="content">Content</label>
            <Editor handleEditorChange={handleEditorChange} initialValue={initialValue}></Editor>
          </div>
          <div className='inputsV'>
            <label>
                <input type="radio" name="visibility" onChange={()=>setIsPublic(true)} defaultChecked checked={isPublic}/>
                Public
              </label>
              <label>
                <input type="radio" name="visibility" onChange={()=>setIsPublic(false)} checked={!isPublic}/>
                Private
              </label>
          </div>
          {id ? <><button onClick={()=>onUpdate()}>Save Changes</button> <button onClick={()=>onDelete()}>Delete Post</button></>: <button onClick={()=>onCreate()}>Create</button>}
        </div>
        

    </>
    
  )
}

export default PostEditor