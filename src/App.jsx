import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import './styles/App.css'
import { hatch } from 'ldrs'


hatch.register()



function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tokenCookies, setTokenCookies] = useState(Cookies.get("token"));
  const navigate = useNavigate();
  let curColor="color0"
  function pickRandomColor(){
    let number = curColor[curColor.length - 1]
    curColor = curColor.slice(0, -1);
    if(number<8){
      curColor = curColor+(parseInt(number)+1)
      return curColor
    }else{
      return curColor + "1"
    }
  }
  useEffect(()=>{
    fetch("https://blog-api-q7yf.onrender.com/posts").then(r=>r.json()).then(r => {setPosts(r), setLoading(false)});
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
  },[tokenCookies])

  return (
    <>
      <div className='accountBTNS'>
        {
          !user ?
          <>
            <button onClick={()=>navigate("/sign-up")}>Sign-up</button>
            <button onClick={()=>navigate("/login")}>Login</button>
          </> : 
          <div className='buttonsA'>
            <h2>Welcome {user.username} !</h2> 
            <div>
              {user.admin ? <button onClick={()=> navigate("/editor")}>Create Post</button> : null}
              <button onClick={()=>{Cookies.remove('token'), setTokenCookies(null)}}>Logout</button>
            </div>
          </div>
          
        }
      </div>
      <h1><span className='redFont'>&lt;</span>dev<span className='redFont'>.</span>blog<span className='redFont'>&gt;</span></h1>
      <h2>Latest posts:</h2>
      { loading ?
        <l-hatch
        size="45"
        stroke="4"
        speed="3.5" 
        color="white" 
        ></l-hatch> : null
      }
      <div className='allPosts'>
        {
          posts.map(art=>{
            return (
              art.public || (user && user.admin)? 
              <button key={art.id} className={'postBlock ' + pickRandomColor()} onClick={()=>navigate("/post/" + art.id)}>
                <div className='content'>
                  <h2 className='date'>{new Date(art.date).toLocaleDateString()}</h2>
                  <h2 className='title'>{art.title}</h2>
                  <h2 className='readMore'>Read more</h2>
                  {user && user.admin ? <><h4 className='readMore'>({art.public ? "Public" : "Private"})</h4> <button onClick={(e)=>{e.stopPropagation(), navigate("/editor/"+art.id)}}>Edit</button></> : null}
                </div>
            </button>
              : 
              null
            )
          })
        }
      </div>
      
    </>
  )
}

export default App
