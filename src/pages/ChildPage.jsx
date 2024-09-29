import React, {useEffect, useState} from 'react';
import {http} from "../core/http-common";
import LoadingIndicator from "../components/LoadingIndicator";
import {useNavigate, useParams} from "react-router-dom";
import Coins from "../components/Coins";
import CardItem from "../components/CardItem";

import GoodDeedsPopup from "../components/GoodDeedsPopup";
import RewardsPopup from "../components/RewardsPopup";
import ChildHabits from "../components/Habits/ChildHabits";
import ChildStatusList from "../components/ChildStatusList";
import ChildTasks from "../components/ChildTasks/ChildTasks";
import Rules from "../components/Rules";
import {useDispatch, useSelector} from "react-redux";
import childrenService from "../core/Domain/ChildrenService";
import {updateChild} from "../core/Store/store";

const ChildPage = props => {
    document.title = "Ребенок";
    let navigate = useNavigate();
    let {childId} = useParams();

    const dispatch = useDispatch();
    const child = useSelector((state) => state.selectedChild);
    const [statuses, setStatuses] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    const [bigGoal, setBigGoal] = useState();
    const [dream, setDream] = useState();
    const [isGoodDeedPopupOpened, setIsGoodDeedPopupOpened] = useState(false)
    const [isBadDeedPopupOpened, setIsBadDeedPopupOpened] = useState(false)
    const [isRewardsPopupOpened, setIsRewardsPopupOpened] = useState(false)

    useEffect(() => {
        if (!child)
            return;

        setStatuses(child.statuses);
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

        setIsLoading(false);
    }, [child])

    useEffect(() => {
        loadChild().then();
    }, [childId]);

    async function loadChild() {
        setIsLoading(true);
        await childrenService.loadChild(childId);
    }

    function spendCoin(reward) {
        http.put("/children/" + child.id + "/spend/", reward)
            .then(({data}) => {
                dispatch(updateChild({...child, balance: data}));
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
                dispatch(updateChild({...child, balance: data}));
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
                setStatuses(prev => prev.filter(x => x.id !== childStatus.id));
            })
            .catch(err => {
                console.log(err);
                alert(err.message);
            });
    }

    function addChildStatus(text) {
        http.put(`/children/${childId}/status`, {text: text})
            .then(({data}) => {
                setStatuses(prev => ([...prev, data]));
            })
            .catch(err => {
                console.log(err);
                alert(err.message);
            });
    }

    return (
        <div>
            <LoadingIndicator isLoading={isLoading}/>
            {!isLoading &&
                <div>
                    <div className='child-info-row'>
                        <img src={child.avatar}/>
                        <div className='d-flex flex-column gap-4'>
                            <div className='coin-container'>
                                <button className='btn btn-outline-primary button w-50'
                                        onClick={() => setIsRewardsPopupOpened(true)}>
                                    -
                                </button>
                                <Coins count={child.balance} size={36} onClick={openCoinHistory}/>
                                <button className='btn btn-outline-primary button w-50'
                                        onClick={() => setIsGoodDeedPopupOpened(true)}>
                                    +
                                </button>
                            </div>
                            {/*<button className='btn btn-link' onClick={openCoinHistory} href="#">История монет</button>*/}
                            <ChildStatusList childStatuses={statuses}
                                             deleteChildStatus={deleteChildStatus}
                                             addChildStatus={addChildStatus}/>
                        </div>
                        <div className='d-flex gap-4'>
                            {bigGoal && <CardItem item={{...bigGoal, title: "Цель: " + bigGoal.title}}/>}
                            {!bigGoal && <CardItem isEmpty={true} item={{title: "Выбрать цель"}}
                                                   onChoose={selectGoal}/>}
                            {dream && <CardItem item={{...dream, title: "Мечта: " + dream.title}}/>}
                            {!dream && <CardItem isEmpty={true} item={{title: "Выбрать мечту"}}
                                                 onChoose={selectDream}/>}
                        </div>
                    </div>
                    <Rules/>
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
                        <ChildHabits/>
                    </div>
                    <div style={{
                        marginTop: 20
                    }}>
                        <ChildTasks/>
                    </div>
                </div>
            }
            <style jsx>{`
              .child-info-row {
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                gap: 1.5rem;
                flex-wrap: wrap;
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
              }
            `}</style>
        </div>
    );
};

export default ChildPage;
