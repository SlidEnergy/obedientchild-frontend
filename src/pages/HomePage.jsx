import React, {useEffect, useState} from 'react';
import LoadingIndicator from "../components/LoadingIndicator";
import ChildList from "../components/ChildList";
import {useNavigate, Outlet, useParams} from "react-router-dom";
import LifeEnergy from "../components/LifeEnergy/LifeEnery";
import TaskViewer from "../components/TaskViewer";
import childrenService from "../core/Domain/ChildrenService";
import {useSelector} from "react-redux";

const HomePage = () => {
    document.title = "Home";
    let {childId} = useParams();
    const navigate = useNavigate();

    const children = useSelector((state) => state.children);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadChildren().then();
    }, []);

    useEffect(() => {
        setIsLoading(false);
    }, [])

    async function loadChildren() {
        setIsLoading(true);
        await childrenService.loadChildren();
    }

    return (
        <div className="p-4">
            {isLoading && <LoadingIndicator isLoading={isLoading}/>}
            <LifeEnergy className="p-4">
            </LifeEnergy>
            {!isLoading &&
                <ChildList className='pb-4' children={children} selected={childId}>
                </ChildList>
            }
            {!isLoading && <Outlet/>}
            <TaskViewer/>
            <div className="c1">
                <iframe
                    src="https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Europe%2FMoscow&bgcolor=%23ffffff&showTz=0&showPrint=0&showTitle=0&mode=WEEK&src=c2xpZGVuZXJneUBnbWFpbC5jb20&src=NjgwNGUyZDMwMDM3OWY5MTRmZDU5MTM1ZDk4NzgwNjUxNGQ5OWFhZmRkNzE5ZDJiNWNmMGI4MjlmOWUxNTNkNkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=MTFkMmU1MzZiZjZhYmFmNmZlM2VmMjY0NGExNDFhZTY0OWNhZWQxODc3ZmEzODhlNDgzMGE3YjE3MGZhMDI0NEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=YjI3M2Y4NTg5M2Q4YmIwMTY4OGFkMTFhNTEyYmRiNzM0YmVhMjkwYjdkYWQyOWY2ZDQ1NGFmMGU0NzQ4NjU2ZkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=cnUucnVzc2lhbiNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%237986CB&color=%230B8043&color=%239E69AF&color=%23F6BF26&color=%2333B679&color=%230B8043"
                    css="border-width:0" width="100%" height="900px" frameBorder="0" scrolling="no"/>
                <div className="c2"></div>
            </div>
            <div className="button-list">
                <button className="btn btn-outline-primary button" onClick={() => navigate("/GoodDeeds")}>Хорошие дела
                </button>
                <button className="btn btn-outline-primary button" onClick={() => navigate("/BadDeeds")}>Плохие дела
                </button>
                <button className="btn btn-outline-primary button" onClick={() => navigate("/rewards")}>Желания</button>
                <button className="btn btn-outline-primary button" onClick={() => navigate("/habits")}>Привычки</button>
            </div>
            <style jsx="true">{`
              .c1 {
                position: relative;
                width: 100%;
                height: 100%;
              }

              .c2 {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.5);
                pointer-events: none;
              }

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
