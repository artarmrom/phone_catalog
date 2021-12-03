import React, {useEffect, useState} from 'react';
import firestore from '../../settings/firebase';
import firebase from 'firebase';

import PhoneList from '../PhoneList/PhoneList'

import {createPhone, getPhonesFromApi} from '../../routes/routes'

import './home.css';
import PhoneModal from "../PhoneActions/PhoneModal/PhoneModal";
import Loader from "../../Components/Loader/Loader";

export default function Home(props){
    const [phones, setPhones] = useState([]);
    const [nextId, setNextId] = useState([]);

    useEffect(()=>{
        getPhones();
    },[])

    const getPhones = async () =>{
        let phonesData = await getPhonesFromApi()
        setPhones(phonesData)
        calculateNextId(phonesData)
    }

    const setNewPhone = (object) =>{
        let copyPhone = [...phones]
        copyPhone.push(object)
        setPhones(copyPhone)
        calculateNextId(copyPhone)
    }

    const editPhone = async (object) =>{
        let copyPhone = [...phones]
        let foundPhone = copyPhone.findIndex((element)=>element.id===object.id);
        if(object.name !== copyPhone[foundPhone].name) {
            let deleteRef = firebase.storage().ref().child(copyPhone[foundPhone].name.trim() + '.png');
            await deleteRef.delete();
        }
        copyPhone[foundPhone]=object;
        setPhones(copyPhone)
    }

    const removePhoneFromList = async (id) =>{
        let copyPhone = [...phones]
        let foundPhone = copyPhone.findIndex((element)=>element.id===id);
        let deleteRef = firebase.storage().ref().child(copyPhone[foundPhone].name.trim()+'.png');
        await deleteRef.delete();
        copyPhone.splice(foundPhone,1);
        setPhones(copyPhone)
        calculateNextId(copyPhone)
    }

    const calculateNextId = (phonesData) =>{
        setNextId(phonesData[phonesData.length-1].id+1)
    }

    return(
        <div>
            <div className='div-catalog-list-title'>
                <p>Phone Catalog</p>
            </div>
            <PhoneModal type='create' id={nextId} setPhone={setNewPhone} saveData={createPhone}/>
            {phones.length>0?
                phones.map((phone)=>{
                    return(
                        <PhoneList key={phone.id} phone={phone} removePhoneFromList={removePhoneFromList} editPhone={editPhone}/>
                    )
                })
            :<Loader/>}
        </div>
    )
}