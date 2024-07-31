import React, {useEffect, useState} from 'react';
import {http} from "../core/http-common";
import LoadingIndicator from "../components/LoadingIndicator";
import {Link, useNavigate, useParams} from "react-router-dom";
import Coins from "../components/Coins";
import RewardItem from "../components/RewardItem";

import GoodDeedsPopup from "../components/GoodDeedsPopup";
import BadDeedsPopup from "../components/BadDeedsPopup";
import RewardsPopup from "../components/RewardsPopup";
import ChildHabits from "../components/Habits/ChildHabits";

const ChildPage = props => {
    let navigate = useNavigate();
    let {childId} = useParams();
    const [child, setChild] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    const [bigGoal, setBigGoal] = useState();
    const [dream, setDream] = useState();
    const [isGoodDeedPopupOpened, setIsGoodDeedPopupOpened] = useState(false)
    const [isBadDeedPopupOpened, setIsBadDeedPopupOpened] = useState(false)
    const [isRewardsPopupOpened, setIsRewardsPopupOpened] = useState(false)

    useEffect(() => {
        document.title = "Ребенок";

        setIsLoading(true);
        http.get("/children/" + childId)
            .then(({data}) => {
                let child = data;
                setChild(data);
                document.title = child.name;

                if (child.bigGoalId) {
                    http.get("/rewards/" + child.bigGoalId)
                        .then(({data}) => {
                            setBigGoal(data);
                        })
                        .catch(err => {
                            console.log(err);
                            alert(err.message);
                        });
                }

                if (child.dreamId) {
                    http.get("/rewards/" + child.dreamId)
                        .then(({data}) => {
                            setDream(data);
                        })
                        .catch(err => {
                            console.log(err);
                            alert(err.message);
                        });
                }
            })
            .catch(err => {
                console.log(err);
                alert(err.message);
            })
            .finally(() => setIsLoading(false));
    }, [])

    function spendCoin(reward) {
        http.put("/children/" + child.id + "/spend/", reward)
            .then(({data}) => {
                setChild({...child, balance: data});
                setIsBadDeedPopupOpened(false);
                setIsRewardsPopupOpened(false);
            })
            .catch(err => {
                console.log(err);
                alert(err.message);
            });
    }

    function earnCoin(reward) {
        http.put("/children/" + child.id + "/earn/", reward)
            .then(({data}) => {
                setChild({...child, balance: data});
                setIsGoodDeedPopupOpened(false);
            })
            .catch(err => {
                console.log(err);
                alert(err.message);
            });
    }

    function selectGoal() {
        navigate("/children/" + child.id + "/SelectGoal");
    }

    function selectDream() {
        navigate("/children/" + child.id + "/SelectDream");
    }

    function openCoinHistory() {
        navigate("/coinhistory/" + child.id);
    }

    return (
        <div>
            <LoadingIndicator isLoading={isLoading}></LoadingIndicator>
            {!isLoading &&
                <div>
                    <div style={{
                        display: 'flex',
                        padding: '20px'
                    }}>
                        <img style={{
                            width: 160,
                            height: 240,
                            borderRadius: 10,
                            marginRight: 20
                        }}
                             src={child.avatar}
                        />
                        <Coins count={child.balance} size={36}></Coins>
                    </div>
                    <div style={{marginBottom: 20}}>
                        <a onClick={openCoinHistory} href="#">История монет</a>
                    </div>
                    <div style={{
                        flexDirection: "row",
                        alignItems: "center",
                        alignContent: "center",
                    }}>
                        <button style={{...styles.button, marginRight: 20}}
                                onClick={() => setIsRewardsPopupOpened(true)}>
                            Потратить
                        </button>
                        <button style={{...styles.button, marginRight: 20}}
                                onClick={() => setIsBadDeedPopupOpened(true)}>
                            -
                        </button>
                        <button style={{...styles.button, marginRight: 20}}
                                onClick={() => setIsGoodDeedPopupOpened(true)}>
                            +
                        </button>
                    </div>
                    <RewardsPopup onChosen={(reward) => spendCoin(reward)}
                                   open={isRewardsPopupOpened}
                                   onOpenChanged={setIsRewardsPopupOpened}>
                    </RewardsPopup>
                    <BadDeedsPopup onChosen={(reward) => spendCoin(reward)}
                                   open={isBadDeedPopupOpened}
                                   onOpenChanged={setIsBadDeedPopupOpened}>
                    </BadDeedsPopup>
                    <GoodDeedsPopup onChosen={(reward) => earnCoin(reward)}
                                    open={isGoodDeedPopupOpened}
                                    onOpenChanged={setIsGoodDeedPopupOpened}>
                    </GoodDeedsPopup>
                    <div style={{
                        marginTop: 20
                    }}>
                        <ChildHabits></ChildHabits>
                    </div>
                    <div>
                        {bigGoal && <RewardItem reward={{...bigGoal, title: "Цель: " + bigGoal.title}}></RewardItem>}
                        <button style={{...styles.button, marginTop: 20}} title="Выбрать цель"
                                onClick={selectGoal}>Выбрать цель
                        </button>
                    </div>
                    <div  style={{
                        marginBottom: 20
                    }}>
                        {dream && <RewardItem reward={{...dream, title: "Мечта: " + dream.title}}></RewardItem>}
                        <button style={{...styles.button, marginTop: 20}} title="Выбрать Мечту"
                                onClick={selectDream}>Выбрать мечту
                        </button>
                    </div>
                </div>
            }
        </div>
    );
};

ChildPage.propTypes = {};

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

export default ChildPage;
