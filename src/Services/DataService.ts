import IDataList from "../Models/IDataList"
import axios from "axios"



const getDataFromServer = () => {

    return axios.get<IDataList[]>(`http://localhost:3000/items`)
    .then(res => res.data)
}

const pushDataToServer = (data : Omit<IDataList, 'id'>) => {
    return axios.post<IDataList>(
        `http://localhost:3000/items`,
        data,
        {
            headers:{
                'content-Type': 'applocation/json'
            }
        }
    ).then(res => res.data)
}
export{
    getDataFromServer , pushDataToServer

}