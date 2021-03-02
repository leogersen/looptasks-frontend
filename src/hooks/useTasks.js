import axios from "axios";
import { useContext, useState } from "react";
import { API_ENDPOINT } from "../constants";
import { AuthContext } from "./useAuth";

export const useTasks = () => {
    const auth = useContext(AuthContext);
    const [ taskList, setTaskList ] = useState([]);
    const [ error, setError ] = useState(null);
    const [ processing, setProcessing ] = useState(false);


    const list = async () => {

        try {
        setProcessing(true);
        setError(null);
       const response = await axios
        .get(`${API_ENDPOINT}/tasks?sort=whenToDo,asc`, buildAuthHeader());
        setTaskList(response.data.content);
        setProcessing(false);

        } catch (error) {
            console.log(error);
            setError(error.message);
            setProcessing(false);

             }
        }
    
    const buildAuthHeader = () => {
        return {
            headers: {
                "authorization": `Bearer ${auth.credentials.token}`
            }
        }
    }

    return { taskList, error, processing, list} ;
    
}