import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { Outlet, Navigate } from "react-router-dom"
import { auth } from "../../firebase"

//Parent route un elementi

const Protected = () => {
    const [isAuth,setIsAuth]=useState()
    
    useEffect(()=>{
        // kullanıcının oturumunu izler ve oturumda bir değişiklik olduğunda cb function ununu tetikler
        onAuthStateChanged(auth,(user)=>{
            setIsAuth(user ? true : false);
            
            
        });
    },[]);
    console.log(auth)
    
    // eğer kullanıcının yetkisi yoksa logine yönlendir.
    
    if(isAuth===false){
        return <Navigate to="/" replace/>;
    }
    
    // eğer yetkisi varsa alt route'daki elmenti göster.
  return  <Outlet/>;
  
}

export default Protected