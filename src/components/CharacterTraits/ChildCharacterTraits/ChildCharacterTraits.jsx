import React, {useEffect, useState} from 'react';
import {api} from "../../../core/api";
import {useNavigate, useParams} from "react-router-dom";
import LoadingIndicator from "../../LoadingIndicator";
import ChildCharacterTraitList from "./ChildCharacterTraitList";

const ChildCharacterTraits = () => {
    let navigate = useNavigate();
    let {childId} = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [childCharacterTraits, setChildCharacterTraits] = useState();

    useEffect(() => {
        loadChildCharacterTraits();
    }, []);

    function loadChildCharacterTraits() {
        setIsLoading(true);
        api.get(`/charactertraits/child/${childId}`)
            .then(({data}) => {
                setChildCharacterTraits(data);
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
            .finally(() => setIsLoading(false));
    }

    function chooseItem(item) {
        navigate('/children/'+ childId + '/charactertraits/' + item.id);
    }

    return (
        <div>
            <h3>Черты характера</h3>
            <LoadingIndicator isLoading={isLoading}/>
            {!isLoading && childCharacterTraits && <ChildCharacterTraitList traits={childCharacterTraits} onChoose={chooseItem}/>}
            <style jsx="true">{`

            `}</style>
        </div>
    );
};

export default ChildCharacterTraits;
