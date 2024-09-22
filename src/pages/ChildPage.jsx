import React, {useEffect, useState} from 'react';
import {http} from "../core/http-common";
import LoadingIndicator from "../components/LoadingIndicator";
import {useNavigate, useParams} from "react-router-dom";
import Coins from "../components/Coins";
import CardItem from "../components/CardItem";

import GoodDeedsPopup from "../components/GoodDeedsPopup";
import BadDeedsPopup from "../components/BadDeedsPopup";
import RewardsPopup from "../components/RewardsPopup";
import ChildHabits from "../components/Habits/ChildHabits";
import ChildStatusList from "../components/ChildStatusList";
import ChildTasks from "../components/ChildTasks/ChildTasks";
import RuleList from "../components/RuleList";

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

    return (
        <div>
            <LoadingIndicator isLoading={isLoading}></LoadingIndicator>
            {!isLoading &&
                <div>
                    <div className='child-info-row'>
                        <img src={child.avatar}/>
                        <div className='d-flex gap-4'>
                            <div className='coin-container'>
                                <button className='btn btn-outline-primary button w-50'
                                        onClick={() => setIsRewardsPopupOpened(true)}>
                                    -
                                </button>
                                <Coins count={child.balance} size={36} onClick={openCoinHistory}></Coins>
                                <button className='btn btn-outline-primary button w-50'
                                        onClick={() => setIsGoodDeedPopupOpened(true)}>
                                    +
                                </button>
                            </div>
                            {/*<button className='btn btn-link' onClick={openCoinHistory} href="#">История монет</button>*/}
                            <ChildStatusList childStatuses={child.statuses}
                                             deleteChildStatus={deleteChildStatus}></ChildStatusList>
                        </div>
                    </div>
                    <RuleList></RuleList>
                    <div style={{
                        flexDirection: "row",
                        alignItems: "center",
                        alignContent: "center",
                    }}>

                        {/*<button className='btn btn-outline-primary button me-4 mt-4'*/}
                        {/*        onClick={() => setIsBadDeedPopupOpened(true)}>*/}
                        {/*    -*/}
                        {/*</button>*/}

                    </div>
                    <RewardsPopup onChosen={(reward) => spendCoin(reward)}
                                  isOpened={isRewardsPopupOpened}
                                  onOpenChanged={setIsRewardsPopupOpened}>
                    </RewardsPopup>
                    {/*<BadDeedsPopup onChosen={(reward) => spendCoin(reward)}*/}
                    {/*               isOpened={isBadDeedPopupOpened}*/}
                    {/*               onOpenChanged={setIsBadDeedPopupOpened}>*/}
                    {/*</BadDeedsPopup>*/}
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
                    <div className='d-flex p-4 gap-4'>
                        {bigGoal && <CardItem item={{...bigGoal, title: "Цель: " + bigGoal.title}}></CardItem>}
                        {!bigGoal && <CardItem isEmpty={true} item={{title: "Выбрать цель"}}
                                               onChoose={selectGoal}></CardItem>}
                        {dream && <CardItem item={{...dream, title: "Мечта: " + dream.title}}></CardItem>}
                        {!dream && <CardItem isEmpty={true} item={{title: "Выбрать мечту"}}
                                             onChoose={selectDream}></CardItem>}
                    </div>
                </div>
            }
            <style jsx>{`
              .child-info-row {
                display: flex;
                flex-direction: row;
                align-items: flex-start;
              }

              .coin-container {
                display: flex;
                align-items: center;
                gap: 1.5rem;
              }

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
