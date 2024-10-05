import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

const GoogleCalendarWebhookPage = () => {
    let {access_token} = useParams();

    useEffect(() => {
        if(access_token)
            localStorage.setItem("googlecalendar_access_token", access_token);
    }, [access_token]);

    return (
        <div>
            success
        </div>
    );
};

export default GoogleCalendarWebhookPage;
