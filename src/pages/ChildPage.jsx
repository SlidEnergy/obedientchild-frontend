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
import ChildStatusList from "../components/ChildStatusList";

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
    const [children, setChildren] = useState()

    useEffect(() => {
        document.title = "Ребенок";
        loadChildren();
    })

    useEffect(() => {
        loadChild();
    }, [childId]);

    function loadChildren() {
        http.get("/children/")
            .then(({data}) => {
                setChildren(data);
            })
            .catch(err => {
                console.log(err);
                alert(err.message);
            })
            .finally();
    }

    function loadChild() {
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
    }

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

    function deleteChildStatus(childStatus) {
        http.delete("/children/" + childStatus.childId + "/status/" + childStatus.id)
            .then(({data}) => {
                loadChild();
            })
            .catch(err => {
                console.log(err);
                alert(err.message);
            });
    }

    function navigationLeft() {
        if (children == null)
            return;

        let i = 0;

        for (i; i < children.length; i++) {
            if (children[i].id == child.id)
                break;
        }

        if (i - 1 >= 0)
            navigate("/children/" + children[i - 1].id);
    }

    function navigationRight() {
        if (children == null)
            return;

        let i = 0;

        for (i; i < children.length; i++) {
            if (children[i].id == child.id)
                break;
        }

        if (i + 1 < children.length)
            navigate("/children/" + children[i + 1].id);
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
                        <div style={styles.navigation}>
                            <div style={styles.navigationButton} onClick={navigationLeft}></div>
                            <div style={styles.navigationButton} onClick={navigationRight}></div>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: "column",
                            padding: '20px'
                        }}>
                            <Coins count={child.balance} size={36}></Coins>
                            <ChildStatusList childStatuses={child.statuses}
                                             deleteChildStatus={deleteChildStatus}></ChildStatusList>
                        </div>
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
                                  isOpened={isRewardsPopupOpened}
                                  onOpenChanged={setIsRewardsPopupOpened}>
                    </RewardsPopup>
                    <BadDeedsPopup onChosen={(reward) => spendCoin(reward)}
                                   isOpened={isBadDeedPopupOpened}
                                   onOpenChanged={setIsBadDeedPopupOpened}>
                    </BadDeedsPopup>
                    <GoodDeedsPopup onChosen={(reward) => earnCoin(reward)}
                                    isOpened={isGoodDeedPopupOpened}
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
                    <div style={{
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
    },
    navigation: {
        position: "absolute",
        display: "flex",
        flexDirection: "row",
        width: 160,
        height: 320
    },
    navigationButton: {
        width: 80,
        height: 240,
        cursor: "pointer"
    }
}

export default ChildPage;
