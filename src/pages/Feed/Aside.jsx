import React from 'react'

const Aside = () => {
    console.log("render oldu")
  return (
    <div className='max-xl:hidden'></div>
  )
}
// React.memo : bileşenin aldığı proplar değişmediği müddetçe bileşenin tekrardan render olmasının önüne geçer

// bir üst bileşen olan Feed bileşeninde user state nin değismesi Feed bileşeninin tekrardan render olmasına ardından Aside bileşenin ise gereksiz yere render olmasına sebep oluyordu react.memo ile bunun önüne geçtik
export default React.memo(Aside)