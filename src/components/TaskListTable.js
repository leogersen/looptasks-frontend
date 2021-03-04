import React, { useContext, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
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

    useEffect(() => {
        if(auth.credentials.username !== null) {
        tasks.list();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ auth.credentials ]);


        /*onDeleteHandler(id) {
            if (window.confirm("Deseja mesmo excluir essa tarefa?"))

            TaskService.delete(id,
                () => {
                this.listTasks();
                toast.success("Tarefa excluída!", { position: toast.POSITION.BOTTOM_LEFT });
                },
                error => this.setErrorState(error));

            }
        
        }*/



        if (!auth.isAuthenticated()) {
            return <Redirect to="/login" />;
            
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
                              onChange={() => false}
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
                              onClick={() => false} />
                              &nbsp;<input
                                  className="btn btn-danger"
                                  type="button"
                                  value="Excluir"
                                  onClick={() => false} />
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