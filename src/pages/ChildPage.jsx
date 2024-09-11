import React, {useEffect, useState} from 'react';
import {http} from "../core/http-common";
import LoadingIndicator from "../components/LoadingIndicator";
import {useNavigate, useParams} from "react-router-dom";
import Coins from "../components/Coins";
import ItemCard from "../components/ItemCard";

import GoodDeedsPopup from "../components/GoodDeedsPopup";
import BadDeedsPopup from "../components/BadDeedsPopup";
import RewardsPopup from "../components/RewardsPopup";
import ChildHabits from "../components/Habits/ChildHabits";
import ChildStatusList from "../components/ChildStatusList";
import ChildTasks from "../components/ChildTasks/ChildTasks";

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
    }, [])

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
                    <div className='d-flex p-4'>
                        <img src={child.avatar} />
                        <div className='navigation'>
                            <div className='navigation-button' onClick={navigationLeft}></div>
                            <div className='navigation-button' onClick={navigationRight}></div>
                        </div>
                        <div className='d-flex flex-column p-4'>
                            <Coins count={child.balance} size={36}></Coins>
                            <ChildStatusList childStatuses={child.statuses}
                                             deleteChildStatus={deleteChildStatus}></ChildStatusList>
                        </div>
                    </div>
                    <div>
                        <button className='btn btn-link' onClick={openCoinHistory} href="#">История монет</button>
                    </div>
                    <div style={{
                        flexDirection: "row",
                        alignItems: "center",
                        alignContent: "center",
                    }}>
                        <button className='btn btn-outline-primary button me-4 mt-4'
                                onClick={() => setIsRewardsPopupOpened(true)}>
                            Потратить
                        </button>
                        <button className='btn btn-outline-primary button me-4 mt-4'
                                onClick={() => setIsBadDeedPopupOpened(true)}>
                            -
                        </button>
                        <button className='btn btn-outline-primary button me-4 mt-4'
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
                    <div style={{
                        marginTop: 20
                    }}>
                        <ChildTasks></ChildTasks>
                    </div>
                    <div>
                        {bigGoal && <ItemCard item={{...bigGoal, title: "Цель: " + bigGoal.title}}></ItemCard>}
                        <button className='btn btn-outline-primary button mt-4' title="Выбрать цель"
                                onClick={selectGoal}>Выбрать цель
                        </button>
                    </div>
                    <div style={{
                        marginBottom: 20
                    }}>
                        {dream && <ItemCard item={{...dream, title: "Мечта: " + dream.title}}></ItemCard>}
                        <button className='btn btn-outline-primary button mt-4' title="Выбрать Мечту"
                                onClick={selectDream}>Выбрать мечту
                        </button>
                    </div>
                </div>
            }
            <style jsx="true">{`
              .button {
                height: 60px;
                width: 300px;
                align-items: center;
                flex: 1;
              }

              .navigation {
                position: absolute;
                display: flex;
                flex-direction: row;
                width: 160px;
                height: 320px;
              }

              .navigation-button {
                width: 80px;
                height: 240px;
                cursor: pointer;
              }

              img {
                width: 160px;
                height: 240px;
                border-radius: 10px;
                margin-right: 20px;
              }
            `}</style>
        </div>
    );
};

export default ChildPage;
