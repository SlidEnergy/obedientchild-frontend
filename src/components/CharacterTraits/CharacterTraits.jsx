import React, {useEffect, useState} from 'react';
import {api} from "../../core/api";
import CharacterTraitList from "./CharacterTraitList";
import LoadingIndicator from "../LoadingIndicator";

const CharacterTraits = ({selectedIds, onSelectedIdsChanged}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [characterTraits, setCharacterTraits] = useState();

    useEffect(() => {
        loadCharacterTraits();
    }, []);

    function loadCharacterTraits() {
        setIsLoading(true);
        api.get(`/charactertraits`)
            .then(({data}) => {
                setCharacterTraits(data);
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
            .finally(() => setIsLoading(false));
    }

    return (
        <div>
            <LoadingIndicator isLoading={isLoading}/>
            {!isLoading && characterTraits && <CharacterTraitList traits={characterTraits} selectedIds={selectedIds} onSelectedIdsChanged={onSelectedIdsChanged}/>}
            <style jsx="true">{`

            `}</style>
        </div>
    );
};

export default CharacterTraits;
