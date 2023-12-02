import React, { Component, useEffect, useState } from 'react';
import { FaChevronLeft } from "react-icons/fa";
import emailjs from '@emailjs/browser'

export default function Offer(props) {
  let [b,setB] = useState(0)
  let [but,setBut] = useState('Отправить заказ')
    let [selc, setSelc] = useState(false)
    let [selo, setSelo] = useState(false)
    let [ot, setOt] = useState([])
    let inp = ['city','area','nnum','pnum','name','sourname']
    let choc = (el) => {
        document.getElementById('city').value = el
        setSelc(false)
        console.log(1)
        ciC()
    }
    let choo = (el) => {
        document.getElementById('area').value = el
        setSelo(false)
    }
    let ciC = async () => {
        let areas = []
        const apiKey = 'e82455e21016d4e21bcf2eb64165b6aa';
        const apiUrl = 'https://api.novaposhta.ua/v2.0/json/';
        document.getElementById('area').value = ''
        let city = document.getElementById('city').value
        let requestParams = {
          apiKey: apiKey,
          Language: 'ru',
          modelName: 'AddressGeneral',
          calledMethod: 'searchSettlements',
          methodProperties: {
            "CityName" : city
          },
        };
        await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestParams),
          })
            .then(response => response.json())
            .then(data => {
              if (data.success) {
                let cities = data.data;
                console.log('Список городов:', cities);
                cities.map(el => {
                    console.log(el.Addresses)
                    el.Addresses.forEach(async el => {
                        areas.push(el.Present)
                        console.log(el.Present)
                    })
              })
                console.log(areas)
              } else {
                console.error('Ошибка при запросе к API:', data.errors);
              }
            })
            setOt(areas)
    }
    let check = () => {
      let res = true
        for (let i of inp){
            if (!document.getElementById(i).value){
                document.getElementById(i).classList.add('border-red-500')
                res = false
            } else {
                document.getElementById(i).classList.remove('border-red-500')
            }
        }
        if (document.getElementById('yes').checked == false){
            document.getElementById('yes').classList.add('scale-[1.5]')
            res = false
        } else {
            document.getElementById('yes').classList.remove('scale-[1.5]')
        }
        if (res){
          send()
        }
        console.log(b)
    }
    const cities = [
        "Киев",
        "Харьков",
        "Одесса",
        "Днепр",
        "Донецк",
        "Запорожье",
        "Львов",
        "Кривой Рог",
        "Николаев",
        "Винница",
        "Херсон",
        "Полтава",
        "Чернигов",
        "Житомир",
        "Сумы",
        "Черкассы",
        "Тернополь",
        "Ивано-Франковск",
        "Луцк",
        "Ужгород"
      ]
    let send = () => {
      var templateParams = {
        pnum: document.getElementById('pnum').value,
        name: document.getElementById('name').value,
        sourname: document.getElementById('sourname').value,
        city: document.getElementById('city').value,
        area: document.getElementById('area').value,
        nnum: document.getElementById('nnum').value,
    };
     
    emailjs.send('service_shmj5jd', 'template_hhsdgjs', templateParams,'JhbnlFkCmHseIbKJO')
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
           setB(1)
           console.log(b)
        }, function(error) {
           console.log('FAILED...', error);
           setB(0)
           console.log(b)
        });
        butt()
    }
    let butt = () => {
      console.log(props.langP)
      if (props.langP === 'ru' && b === 0){
        setBut('Отправить заказ')
      }
      if (props.langP === 'ru' && b === 1){
        setBut('Заказ получен')
      }
      if (props.langP === 'ru' && b === 2){
        setBut('Произошла ошибка')
      }
      if (props.langP === 'ua' && b === 0){
        setBut('Відправити замовлення')
      }
      if (props.langP === 'ua' && b === 1){
        setBut('Замовлення отримано')
      }
      if (props.langP === 'ua' && b === 2){
        setBut('Виникла помилка')
      }
    }
    let total = () => {
      let res = 0
      props.curitems.map(el => {
        res += parseInt(el.price) * el.cout
      })
      return res
    }
    useEffect(() => (
      butt()
    ))
    return(
        <div className='fixed top-[0%] h-screen left-[0%] w-[100%] bg-white flex flex-col sm:flex-row overflow-y-auto'>
            <div onClick={() => props.Show()} className='absolute left-2 top-1 border border-black scale-[1.2]'><FaChevronLeft /></div>
            <div className='w-[100%] h-[60vh] sm:h-full overflow-y-auto'>
            <div className='px-2 flex flex-col'>
                <p className='text-center mt-1'>Ваши контактные данные</p>
                <input placeholder='Номер телефона' className='border border-black mt-1' id='pnum'></input>
                <input placeholder='Имя' className='border border-black mt-2' id='name'></input>
                <input placeholder='Фамилия' className='border border-black mt-2' id='sourname'></input>
                <p className='text-center mb-1'>Форма доставки</p>
                <input onClick={() => setSelc(!selc)} placeholder='Город' className='border border-black' id='city'></input>
                {selc && <ul className='flex flex-col h-20 sm:h-40 overflow-y-auto'>
                    {cities.map(el => (
                        <div onClick={() => choc(el)} className='border flex w-auto'>{el}</div>
                    ))}
                </ul>}
                <input onClick={() => setSelo(!selo)} placeholder='Область' className='border border-black mt-2' id='area'></input>
                {selo && <ul className='flex flex-col h-40 overflow-y-auto'>
                    {ot.map(el => (
                        <div onClick={() => choo(el)} className='border flex w-auto'>{el}</div>
                    ))}
                </ul>}
                <input placeholder='Номер отделения' className='border border-black mt-2' id='nnum'></input>
                <hr></hr>
                <div className='flex mx-auto mt-2'>
                    <p className='mr-1'>Всё написано правильно</p>
                    <input type='checkbox' id='yes' className=' duration-300'></input>
                </div>
                <p className='text-center mb-1'>Общая цена без доставки: {total()}₴</p>
                <button disabled={b !== 0} onClick={() => check()} className='p-2 cursor-pointer border border-black rounded-lg w-[40%] text-center mx-auto hover:bg-gray-800 duration-150'>{but}</button>
            </div>
            </div>
            <div className='w-full overflow-y-auto border-t border-black sm:border-t sm:border-white'>
                <p className='text-center'>Ваши товары</p>
                <div className='flex-wrap flex justify-center overflow-y-auto'>
                    {props.curitems.map(el => (
                        <div className='m-1 w-[30%] border border-black rounded-lg overflow-hidden'>
                            <img src={el.img[0]}></img>
                            <div className='flex flex-col text-center'>
                            {el.cout <= 1 ? null : <p className=''>{el.cout}X</p>}
                            <p className='text-center my-auto'>{el.price}₴</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}