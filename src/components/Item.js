import React, { useEffect, useState } from 'react'
import Info from './Info'
import {RiShoppingBasket2Fill} from 'react-icons/ri'
import {AiOutlineInfo} from 'react-icons/ai'
import {IoMdClose} from 'react-icons/io'
import { MdOutlineSportsSoccer } from 'react-icons/md'
import { GiOpenBook } from 'react-icons/gi'
import { PiBabyBold } from 'react-icons/pi'

export default function Item(props) {
    let [show, setShow] = useState(false)
    let [select, setSelect] = useState(false)
    let [text, setText] = useState('')
    let sel = <IoMdClose className='scale-150'/>
    let unsel = <RiShoppingBasket2Fill className='scale-150'/>
    
    const info = () => {
        setShow(!show)
        if (!show) {
          document.body.style.overflow = "hidden"
        } else {
          document.body.style.overflow = "auto"
        }
    }

    const addItem = () => {
      return
    }

    const title = () => {
      if (props.langP == 'ru'){
        return props.item.title
      } else {
        return props.item.titleUa
      }
    }
    const sele = () => {
      props.curitems.forEach(el => {
        if (el.idu === props.item.idu){
          return true
        }
      })
      return false
    }
  return (
    <div className='justify-between flex flex-col pb-2 mt-2 border-2 border-gray rounded-t-[10px] hover:border-black transition-all'>
        <div>
          <p></p>
          <img onClick={() => info()} className='block max-w-[100%] mx-auto rounded-t-[10px]' src={props.item.img[0]}></img>
          <p onClick={() => info()} className='mx-2'>{title()}</p>
        </div>
        <div className='mt-2 px-2 w-full inline-flex justify-between'>
        <div onClick={() => info()} className='p-4 border border-black rounded-lg hover:bg-gray-800 transition-all' id='but'><AiOutlineInfo className='scale-150'/></div>
            <p className='my-auto font-bold text-center'>{props.item.price} UAH</p>
            <div className='flex'>
              <div onClick={() => props.addItem(props.item)} className={`flex p-4 border border-black rounded-lg hover:bg-gray-800 transition-all ${props.item.cout >= 1 && 'bg-gray-700'}`} id='but'>{props.item.cout >= 1 ? sel : unsel}</div>
            </div>
        </div>
        {show ? <Info ci={false} langP={props.langP} text={text} colors={props.colors} item={props.item} show={show} info={info} addItem={props.addItem} curitems={props.curitems} lang={props.lang}/> : null}
    </div>
  )
}
