import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { doc, updateDoc } from 'firebase/firestore';
import {db} from "../../firebase"
import upload from "../../utils/upload"
import { toast } from 'react-toastify';
import Loader from "../Loader"
const Modal = ({tweet,close}) => {
    const [isLoading,setIsLoading]=useState(false)
    // form gönderilince
    const handleSubmit=async (e)=>{
        e.preventDefault()
        setIsLoading(true)
        // inputlardaki verilere eriş
        const text=e.target[0].value
        const file=e.target[1].files[0]

        // güncellenecek olan dökümanın referansını al
        const tweetRef=doc(db,"tweets",tweet.id)
        try{
        // eğer dosya seşilmediyse sadece yazıyı güncelle
        if(!file || !file?.type.startsWith("image")){
             await updateDoc(tweetRef,{
                textContent:text,
                isEdited:true,
            })
            return close()
        }

        // dosya seçildiyse hem yazı hem foto güncelle

        // seçilen fotoyu storage'a yükle
        const newUrl=await upload(file)

        // belgenin hem foto hem yazı değerini güncelle
        await updateDoc(tweetRef,{
            textContent:text,
            imageContent:newUrl,
            isEdited:true,

        })
        // bildirim gönder
        toast.success("Tweet başarıyla güncellendi")
    }catch(err){
        // hata bildirimi gönder
        toast.error("Bir sorun oluştu.")
        console.log(err)
    }
    setIsLoading(false)
        // modal'ı kapat
        close()
    }
    
  return (
    <div className='fixed inset-0 w-full h-full grid place-items-center bg-gray-600 bg-opacity-30'>
        <div className='bg-black rounded-md py-10 px-8 w-3/4 max-w-[600px] min-h-[60vh] max-h-[80vh] flex flex-col'>
            <div className='flex justify-between'>
                <h1 className='text-xl font-bold'>Tweet'i Düzenle</h1>
                <button onClick={close}><IoMdClose className='text-3xl transition hover:text-gray-500' /></button>
            </div>

            <form onSubmit={handleSubmit} className='flex-1 mt-10 flex flex-col justify-between'>
                <div className='flex flex-col'>
                    <label className='mb-4' >İçeriği Değiştir</label>
                    <input name='title' defaultValue={tweet.textContent} type="text" className='border rounded-md p-1 text-black' />
                    <label className='mt-10 mb-4'>Fotoğraf Ekle / Değiştir</label>
                    <input name='file' type="file" />
                </div>
                
                <div className='flex justify-end gap-5'>
                    <button onClick={close} className='bg-gray-500 py-2 px-4 rounded-full hover:bg-gray-600' type='button'>Vazgeç</button>
                    <button disabled={isLoading} className='bg-blue-500 py-2 px-4 rounded-full hover:bg-blue-600 min-w-[80px] flex justify-center items-center' type='submit'>
                        {isLoading ? <Loader/> : "Kaydet"}
                        </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Modal