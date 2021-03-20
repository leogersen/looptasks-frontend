import React, { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from 'react-router-dom';
import Alert from './Alert';
import Spinner from './Spinner';
import Moment from 'react-moment';
import { useTasks } from '../hooks/useTasks';
import { AuthContext } from '../hooks/useAuth';

const TaskListTable = () =>  {

    const auth = useContext(AuthContext);
    const tasks = useTasks();
    const [ editId, setEditId ] = useState(0);

    useEffect(() => {
        if(auth.credentials.username !== null) {
        tasks.list();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ auth.credentials ]);


        const onDeleteHandler = (taskToDelete) => {
            if (window.confirm("Deseja mesmo excluir essa tarefa?")){
                tasks.remove(taskToDelete);
            } 
        
        }

        const onStatusChangeHandler = (taskToUpdate) => {
            taskToUpdate.done = !taskToUpdate.done;
            tasks.save(taskToUpdate, true);

        }

        const onEditHandler = (taskToEdit) => {
            setEditId(taskToEdit.id);

        }

        useEffect(() => {
            if(tasks.taskRemoved !== null) {
                toast.success(`Tarefa ${tasks.taskRemoved.id} excluída`, 
                { position: toast.POSITION.BOTTOM_LEFT});
            tasks.clearTaskRemoved();
            }
            if(tasks.taskUpdated !== null) {
                toast.success(`Tarefa ${tasks.taskUpdated.id} foi marcada como ${!tasks.taskUpdated.done ? "não" : "" } concluída`, 
                { position: toast.POSITION.BOTTOM_LEFT});
            tasks.clearTaskUpdated();
            }

        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [tasks.taskRemoved, tasks.taskUpdated])



        if (!auth.isAuthenticated()) {
            return <Redirect to="/login" />;
            
        }

        if (editId > 0) {
            return <Redirect to={`/form/${editId}`} />;
        }


        return (
            <div>
                <h1>Lista de Tarefas</h1>
                { tasks.error && <Alert message={tasks.error} /> }
                { tasks.processing ? <Spinner/> :

                <table className="table table-striped">

                <thead className="table-dark">
                    <tr>
                        <th scope="col">Status</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Data</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                    
            <tbody>                
                { tasks.taskList.length ===  0 ? 
                <tr>
                   <td colSpan="4">Sem tarefas cadastradas no momento!</td> 
                </tr>
                :
                (    
                    tasks.taskList.map(task =>
                      <tr key={task.id}>
                          <td><input 
                              type="checkbox" 
                              checked={task.done} 
                              onChange={() => onStatusChangeHandler(task)}
                              /> </td>
                          <td>{ task.done ? <s> {task.description} </s> : task.description }</td>
                          <td>{ task.done ? <s> <Moment format="DD/MM/YYYY">{task.whenToDo}</Moment> </s> 
                          :  <Moment format="DD/MM/YYYY">{task.whenToDo}</Moment> }
                          </td>
                          <td>
                              <input 
                              className="btn btn-primary" 
                              type="button" 
                              value="Editar"
                              onClick={() => onEditHandler(task)} />
                              &nbsp;<input
                                  className="btn btn-danger"
                                  type="button"
                                  value="Excluir"
                                  onClick={() => onDeleteHandler(task)} />
                          </td>
                      </tr>
                    )
                 )}
            </tbody>     
                
                </table>
            }
                <ToastContainer autoClose={1500} />

            </div>
        );
    }

export default TaskListTable;