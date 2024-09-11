import React, {useEffect, useState} from 'react';
import {http} from "../core/http-common";
import LoadingIndicator from "../components/LoadingIndicator";
import ChildList from "../components/ChildList";
import {useNavigate} from "react-router-dom";
import LifeEnergy from "../components/LifeEnergy/LifeEnery";
import TaskViewer from "../components/TaskViewer";

const HomePage = () => {
    document.title = "Home";

    const navigate = useNavigate();

    const [children, setChildren] = useState();
    const [child, setChild] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        loadChildren();
    }, []);

    function loadChildren() {

        setIsLoading(true);
        http.get("/children")
            .then(({data}) => {
                setChildren(data);
            })
            .catch(err => {
                console.log(err);
                alert("Error: " + err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className="p-4">
            {isLoading && <LoadingIndicator isLoading={isLoading}></LoadingIndicator>}
            <LifeEnergy className="p-4">
            </LifeEnergy>
            {!isLoading &&
                <ChildList className='pb-4' children={children}>
                </ChildList>
            }
            <TaskViewer></TaskViewer>
            <iframe
                src="https://calendar.google.com/calendar/embed?height=NaN&wkst=1&ctz=Europe%2FMoscow&bgcolor=%23ffffff&showTz=0&showPrint=0&showTitle=0&src=c2xpZGVuZXJneUBnbWFpbC5jb20&src=NjgwNGUyZDMwMDM3OWY5MTRmZDU5MTM1ZDk4NzgwNjUxNGQ5OWFhZmRkNzE5ZDJiNWNmMGI4MjlmOWUxNTNkNkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=OGMwYjY3YjE3ODY1ZGM1NjkzNzc5NjNlMTc2ODg1MjQwZmU2MmFjZjNiMzhkNzk3OGY0ZmYzNDVhMjI3YzNkOEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=M2M5YWExNjRiOGNmYjY2ZDI5NDIxYTU2ZjQyMGYyMzY0YTNmY2ZiNDBmNWFmYTZkMmFkYTBjOTE3YzdjNWE0NEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=cnUucnVzc2lhbiNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%237986CB&color=%230B8043&color=%23D81B60&color=%238E24AA&color=%2333B679&color=%230B8043"
                css="border-width:0" width="100%" height="900px" frameBorder="0" scrolling="no"></iframe>
            <div className="button-list">
                <button className="btn btn-outline-primary button" onClick={() => navigate("/GoodDeeds")}>Хорошие дела
                </button>
                <button className="btn btn-outline-primary button" onClick={() => navigate("/BadDeeds")}>Плохие дела
                </button>
                <button className="btn btn-outline-primary button" onClick={() => navigate("/rewards")}>Желания</button>
                <button className="btn btn-outline-primary button" onClick={() => navigate("/habits")}>Привычки</button>
            </div>
            <style jsx="true">{`
              .button-list {
                display: flex;
                justify-content: space-between;
                gap: 10px; /* Пространство между кнопками */
                padding-top: 1.5rem;
              }

              .button {
                flex: 1; /* Равная ширина кнопок */
                padding: 10px 20px;
              }

              /* Медиа-запрос для мобильных устройств */
              @media (max-width: 768px) {
                .button-list {
                  flex-direction: column; /* В столбец на мобильных */
                }

                .button {
                  width: 100%; /* Кнопки на всю ширину */
                }
              }
            `}</style>
        </div>
    );
};

export default HomePage;
