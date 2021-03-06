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
            handleError(error);

             }
        }

        
    const delete = async (taskToDelete) => {
        try{
        await axios
        .delete(`${API_ENDPOINT}/tasks/${id}`, this.buildAuthHeader())
        }catch (error) {
            handleError(error);

        }
    }
    
    const buildAuthHeader = () => {
        return {
            headers: {
                "authorization": `Bearer ${auth.credentials.token}`
            }
        }
    }

    const handleError = (error) => {
        console.log(error);
        setError(resp.data.error);

        if (resp && resp.status === 400 && resp.data) {
            setError(resp.data.error);
        } else {
            setError(error.message);
        }

        setProcessing(false);
    }

    return { taskList, error, processing, list} ;
    
}