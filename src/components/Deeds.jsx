import React, {useState, useEffect} from 'react';
import LoadingIndicator from "./LoadingIndicator";
import RewardList from "./RewardList";
import 'reactjs-popup/dist/index.css';
import DeedsService from "../core/Domain/DeedsService";
import classnames from "classnames";

const Deeds = ({types, className}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [deeds, setDeeds] = useState();

    useEffect(() => {
        loadData().then();
    }, []);

    async function loadData() {
        setIsLoading(true);
        try {
            const deeds = await DeedsService.loadDeeds(types);
            setDeeds(deeds);
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={classnames(className)}>
            <LoadingIndicator isLoading={isLoading}/>
            {!isLoading &&
                <RewardList rewards={deeds}>
                </RewardList>
            }
            <style jsx>{`

            `}</style>
        </div>
    );
};

export default Deeds;
