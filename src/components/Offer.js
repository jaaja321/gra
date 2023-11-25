import React, { Component, useState } from 'react';
import { FaChevronLeft } from "react-icons/fa";

export default function Offer(props) {
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
        ciO()
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
    let ciO = () => {
        const apiKey = 'e82455e21016d4e21bcf2eb64165b6aa';
        const apiUrl = 'https://api.novaposhta.ua/v2.0/json/';
        let area = document.getElementById('area').value
        const areaName = area; // Замените на конкретное название области
        
        const requestParams = {
          apiKey: apiKey,
          modelName: 'AddressGeneral',
          calledMethod: 'getWarehouses',
          methodProperties: {
            Language: 'ru', // Вы можете использовать 'ru' или 'ua' в зависимости от языка, на котором хотите получить результаты
            CityName: '', // Пустое значение для получения всех отделений в области
            SettlementType: 'область', // Или 'село', 'деревня', и так далее, в зависимости от типа населенного пункта
            Area: areaName,
          },
        };
        
        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestParams),
        })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              const warehouses = data.data;
              
              // Перебор полученного списка отделений
              warehouses.forEach(warehouse => {
                console.log('Отделение:', warehouse.Description);
                // Здесь вы можете делать что-то с каждым отделением
              });
            } else {
              console.error('Ошибка при запросе к API:', data.errors);
            }
          })
          .catch(error => {
            console.error('Ошибка при выполнении запроса:', error);
          });
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
        }
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
    return(
        <div className='fixed top-[0%] left-[0%] h-[100vh] w-[100%] bg-white flex flex-col sm:flex-row overflow-y-auto'>
            <div onClick={() => props.Show()} className='fixed left-2 top-1 border border-black scale-[1.2]'><FaChevronLeft /></div>
            <div className='w-[100%] overflow-y-auto h-[80vh]'>
            <div className='px-2 flex flex-col'>
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
                <p className='text-center mt-1'>Ваши контактные данные</p>
                <input placeholder='Номер телефона' className='border border-black mt-1' id='pnum'></input>
                <input placeholder='Имя' className='border border-black mt-2' id='name'></input>
                <input placeholder='Фамилия' className='border border-black mt-2' id='sourname'></input>
                <div className='flex mx-auto my-2'>
                    <p className='mr-1'>Всё написано правильно</p>
                    <input type='checkbox' id='yes' className=' duration-300'></input>
                </div>
                <div onClick={() => check()} className='cursor-pointer border border-black rounded-lg w-[40%] text-center mx-auto'>Отправить заказ</div>
            </div>
            </div>
            <div className='w-full overflow-y-auto border-t border-black sm:border-t sm:border-white'>
                <p className='text-center'>Ваши товары</p>
                <div className='flex-wrap flex justify-center'>
                    {props.curitems.map(el => (
                        <div className='m-1 w-[30%] border border-black rounded-lg overflow-hidden'>
                            <img src={el.img[0]}></img>
                            <p className='text-center'>{el.price} UAH</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}