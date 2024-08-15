import moment from 'moment'
import React from 'react'
import { MdEdit } from 'react-icons/md'

const UserInfo = ({tweet}) => {
    // tarih verisne eris
    let date=tweet.createdAt?.toDate()
    // moment yardımıyla suanki tarihten ne kadar uzak olduğunu hesaplar.
    
    date=moment(date).fromNow()
    console.log(date)
  return (
    <div className='flex gap-3 items-center whitespace-nowrap'>
        <p className='text-gray-400 text-sm'>@{tweet.user.name.toLowerCase().split(" ").join("_") }</p>
        <p className='text-gray-400 text-sm'>{date} </p>

        {
            tweet.isEdited && (
                <p className='text-gray-400 text-xs'>
                    <span className='max-md:hidden'>*düzenlendi</span>
                    <MdEdit className='md:hidden'/>
                </p>
            )
        }
    </div>
  )
}

export default UserInfo