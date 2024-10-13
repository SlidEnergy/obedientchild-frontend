import React, {useEffect, useState} from 'react';
import LoadingIndicator from "../components/LoadingIndicator";
import ChildList from "../components/ChildList";
import {useNavigate, Outlet, useParams} from "react-router-dom";
import LifeEnergy from "../components/LifeEnergy/LifeEnery";
import TaskViewer from "../components/TaskViewer";
import childrenService from "../core/Domain/ChildrenService";
import {useSelector} from "react-redux";
import CalendarView from "../components/CalendarView";

const HomePage = () => {
    document.title = "Home";
    let {childId} = useParams();
    const navigate = useNavigate();

    const children = useSelector((state) => state.children);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadChildren().then();

        return childrenService.subscribe();
    }, []);

    useEffect(() => {
        isLoading && setIsLoading(false);
    }, [children]);

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
            {/*<TaskViewer/>*/}
            <CalendarView/>
            <div className="button-list">
                <button className="btn btn-outline-primary button" onClick={() => navigate("/GoodDeeds")}>Хорошие дела
                </button>
                <button className="btn btn-outline-primary button" onClick={() => navigate("/BadDeeds")}>Плохие дела
                </button>
                <button className="btn btn-outline-primary button" onClick={() => navigate("/rewards")}>Желания</button>
                <button className="btn btn-outline-primary button" onClick={() => navigate("/habits")}>Привычки</button>
            </div>
            <style jsx>{`
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
