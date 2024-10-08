import React, {useEffect, useState, useRef} from 'react';
import {api} from "../../core/api";
import {useNavigate, useParams} from "react-router-dom";
import LoadingIndicator from "../LoadingIndicator";
import {toApiDateString} from "../../utils/DateUtils";
import ChildTaskList from "./ChildTaskList";

const ChildTasks = props => {
    let navigate = useNavigate();
    let {childId} = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [childTasks, setChildTasks] = useState();

    useEffect(() => {
        loadTasks();
    }, [childId]);

    function loadTasks() {
        setIsLoading(true);
        api.get(`/childtasks/day?childId=${childId}&day=${toApiDateString(new Date())}`)
            .then(({data}) => {
                setChildTasks(data);
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
            .finally(() => setIsLoading(false));
    }

    function addChildTask() {
        navigate("/children/" + childId + "/childtasks/");
    }

    function removeChildTask(item) {
        api.delete(`/childtasks/${item.id}`)
            .then(({data}) => {
                loadTasks();
            })
            .catch(err => {
                console.log(err);
                alert(err.message);
            });
    }

    function setChildTaskStatus(item, status) {
        api.post(`/childtasks/${item.id}/status?childId=${childId}&status=${status}`)
            .then(({data}) => {
                loadTasks();
            })
            .catch(err => {
                console.log(err);
                alert(err.message);
            });
    }

    return (
        <div>
            <h3>Задачи</h3>
            <LoadingIndicator isLoading={isLoading}/>
            {childTasks && <ChildTaskList childTasks={childTasks} setChildTaskStatus={setChildTaskStatus}
                                          removeChildTask={removeChildTask}/>}
            <button className='btn btn-outline-primary button' title="Добавить Задачу" onClick={addChildTask}>Добавить
                задачу
            </button>
            <style jsx="true">{`
              .button {
                height: 60px;
                width: 300px;
                align-items: center;
                flex: 1;
                margin-top: 1.5rem;
              }
            `}</style>
        </div>
    );
};

export default ChildTasks;
