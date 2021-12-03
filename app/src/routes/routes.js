import axios from "axios/index";
const url = process.env.REACT_APP_API_URL;

export const getPhonesFromApi = async () => {
    let result = await axios.get(url+'/phone');
    if(result.status===200){
        return result.data
    }else{
        alert()
    }
}

export const deletePhone = async (id) => {
    await axios.delete(url+'/deletePhone/'+id);
}

export const createPhone = async (object) => {
    await axios.post(url+'/createPhone',object);
}

export const editPhone = async (object) => {
    await axios.post(url+'/editPhone',object);
}