import React, { useState } from 'react'
import Info from './Info'
import {IoMdClose} from 'react-icons/io'
import {AiOutlineInfo} from 'react-icons/ai'
import { FaPlus,FaMinus } from "react-icons/fa";
import axios from 'axios'

async function CartItem(props) {
    let [show, setShow] = useState(false)
    let [result, setResult] = useState('')
    const info = () => {
        setShow(!show)
        if (!show) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }
    const data = await axios.post('https://pay.fondy.eu/static_common/v1/checkout/ipsp.js')
    let api = 'https://pay.fondy.eu/static_common/v1/checkout/ipsp.js'
    const pay = () => {
        axios.get(api).then((res) => {
            setResult({res})
        })
    }
  return (
    <div className='w-[100%] m-1 flex justify-center border border-gray rounded-[10px] hover:border-black transition-all'>
        {show ? <Info ci={true} lang={props.lang} className='z-[99]' item={props.item} show={show} info={info} addItem={props.addItem} curitems={props.curitems}/> : null}
        <img className='my-auto h-[18vh] rounded-l-[10px]' src={props.item.img}></img>
        <div className='m-auto flex flex-col justify-center text-center'>
            
            <p className='mx-auto font-bold'>{props.item.price}$</p>
        </div>
        <div className='my-auto mr-2'>
            <div onClick={() => pay()} className='m-1 p-3 border border-black rounded-lg hover:bg-gray-800 transition-all'><FaPlus className='scale-[1.5]'/></div>
            <p>{props.item.cout}</p>
            <button onClick={() => props.ammo('-',props.item)} disabled={props.item.cout === 1} className='m-1 p-3 border border-black rounded-lg hover:bg-gray-800 transition-all'><FaMinus className='scale-[1.5]'/></button>
        </div>
        <div className='my-auto mr-2'>
            <div onClick={() => props.addItem(props.item)} className='m-1 p-3 border border-black rounded-lg hover:bg-gray-800 transition-all'><IoMdClose className='scale-[2]'/></div>
            <div onClick={() => info()} className='m-1 p-3 border border-black rounded-lg hover:bg-gray-800 transition-all'><AiOutlineInfo className='scale-[2]'/></div>
        </div>
    </div>
  )
}

export default CartItem