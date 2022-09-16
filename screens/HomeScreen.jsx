import React, {useEffect, useState} from 'react';
import ChildList from "../components/ChildList";

const HomeScreen = ({navigation}) => {
    const [ children, setChildren ] = useState();

    useEffect(() => {
        setChildren(["Аня", "Влада"]);
    }, []);

    return (
        <ChildList children={children} navigation={navigation}>
        </ChildList>
    );
};

export default HomeScreen;