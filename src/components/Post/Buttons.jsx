import React from 'react'
import { CiShare2 } from 'react-icons/ci'
import { FaHeart,FaRegHeart, FaRetweet } from 'react-icons/fa'
import { LuMessageCircle } from 'react-icons/lu'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import {db,auth} from "../../firebase"

const Buttons = ({tweet}) => {
  // oturumu açık olan bu tweet i like ladı mı
  const isLiked=tweet.likes.includes(auth.currentUser.uid)
  // like durumunu tersine çevirir
  const toggleLike=async ()=>{
    // güncellenecek dökümanın referansını al
    const tweetRef=doc(db,"tweets",tweet.id)
    // referansı alınan tweet i güncelle
    await updateDoc(tweetRef,{
      likes:isLiked ? arrayRemove(auth.currentUser.uid) : arrayUnion(auth.currentUser.uid)
    })
  }
  return (
    <div className='flex justify-between items-center'>
      <div className='p-3 rounded-full cursor-pointer transition hover:bg-[#00aaff5a]'>
        <LuMessageCircle/>
      </div>
      <div className='  p-3 rounded-full cursor-pointer transition hover:bg-[#00ff5546]'>
        <FaRetweet/>
        
      </div>
      <div onClick={toggleLike} className='flex gap-2 items-center p-3 rounded-full cursor-pointer transition hover:bg-[#ff000055]'>
        {isLiked ? <FaHeart className='text-red-500'/> : <FaRegHeart/> }
        
        <span>{tweet.likes.length}</span>
      </div>
      <div className='p-3 rounded-full cursor-pointer transition hover:bg-[#49494e91]'>
        <LuMessageCircle/>
      </div>
    </div>
  )
}

export default Buttons