export const saveStore = (state) =>{

    try{
        const data = JSON.stringify(state);
        localStorage.setItem('state', data);
    }catch(err){
        console.log(err)
    }
}

export const loadStore = () =>{

    const data = localStorage.getItem('state');

    if(data !== null || data !== undefined){
        return JSON.parse(data)
    }else{
        return undefined;
    }

}