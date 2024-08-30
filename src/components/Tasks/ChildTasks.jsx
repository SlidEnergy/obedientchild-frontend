import React, {useEffect, useState, useRef} from 'react';
import {http} from "../../core/http-common";
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
    }, []);

    function loadTasks(){
        setIsLoading(true);
        http.get(`/childtasks/day?childId=${childId}&day=${toApiDateString(new Date())}`)
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
        http.delete(`/childtasks/${item.id}`)
            .then(({data}) => {
                loadTasks();
            })
            .catch(err => {
                console.log(err);
                alert(err.message);
            });
    }

    function setChildTaskStatus(item, status) {
        http.post(`/childtasks/${item.id}/status?childId=${childId}&status=${status}`)
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
            <LoadingIndicator isLoading={isLoading}></LoadingIndicator>
            {childTasks && <ChildTaskList childTasks={childTasks} setChildTaskStatus={setChildTaskStatus} removeChildTask={removeChildTask}></ChildTaskList>}
            <button style={{...styles.button, marginTop: 20}} title="Добавить Задачу" onClick={addChildTask}>Добавить задачу
            </button>
        </div>
    );
};

ChildTasks.propTypes = {};

const styles = {
    button: {
        height: 60,
        width: 300,
        fontSize: 24,
        borderRadius: 2,
        alignItems: "center",
        backgroundColor: "#337ab7",
        flex: 1,
    },
    buttonText: {
        fontSize: 22,
        marginTop: 10,
        color: "white"
    },
    h2: {
        fontSize: 24
    }
}

export default ChildTasks;
