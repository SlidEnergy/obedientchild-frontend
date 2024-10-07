import React, {useEffect, useRef, useState} from 'react';
import {useGoogleAuth} from "../infrastructure/GoogleCalendar/GoogleAuth";
import LoadingIndicator from "./LoadingIndicator";
import Planner from "./Planner";

const PlannerTab = () => {
    const {refreshIsAuthenticated, isAuthenticated, signInGoogle} = useGoogleAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        refreshIsAuthenticated().finally(() => setIsLoading(false));
    }, [])

    return (
        <div>
            <LoadingIndicator isLoading={isLoading}/>
            {!isAuthenticated && <button className='button btn btn-outline-primary' onClick={() => signInGoogle()}>
                Авторизоваться в google
            </button>
            }
            {isAuthenticated && <Planner/>
            }
            <style jsx="true">{`
            `}</style>
        </div>
    );
};

export default PlannerTab;
