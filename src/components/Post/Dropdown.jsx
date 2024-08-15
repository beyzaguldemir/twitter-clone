import React, { useState,useRef } from 'react'
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../../firebase';
import Modal from "../Modal"
const Dropdown = ({tweet}) => {
  const [isModalOpen,setIsModalOpen]=useState(false)

 //input referansı
  const inputRef=useRef()
  console.log(inputRef)
   // dropdown ı kapat
  const close=()=>{
    inputRef.current.checked=false
  }
  //Düzenleme
  const handleEdit=()=>{
    setIsModalOpen(true)
    close()
  }
  //Silme
  const handleDelete=()=>{
    // silinicek dökümanın referansını al
    const tweetRef=doc(db,"tweets",tweet.id)
    // dökümanı kaldır
    deleteDoc(tweetRef).then(()=>toast.info("Tweet akıştan kaldırıldı.")).catch(()=>toast.error("Bir sorun oluştu."))
    close()
  }
  return (
    <>
<label className="popup">
  <input ref={inputRef} type="checkbox"/>
  <div className="burger" >
    <span></span>
    <span></span>
    <span></span>
  </div>
  <nav className="popup-window">
    <legend>Eylemler</legend>
    <ul>
    
      <li>
        <button onClick={handleEdit}>
        <MdEdit />
          <span>Düzenle</span>
        </button>
      </li>
      <hr/>
      <li>
        <button onClick={handleDelete}>
        <FaTrash className='text-red-500'/>
          <span>Sil</span>
        </button>
      </li>
    </ul>
  </nav>
</label>
{isModalOpen && <Modal tweet={tweet} close={()=>setIsModalOpen(false)}/>}
</>
  )
}

export default Dropdown