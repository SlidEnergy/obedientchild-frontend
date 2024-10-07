import React, {useEffect, useState} from 'react';
import {api} from "../core/api";
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
import {Tab, Tabs} from "react-bootstrap";
import ChildCharacterTraits from "../components/CharacterTraits/ChildCharacterTraits/ChildCharacterTraits";
import Planner from "../components/Planner";
import {GoogleAuthProvider} from "../infrastructure/GoogleCalendar/GoogleAuth";

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

    const [activeKey, setActiveKey] = useState('habits');
    const [isRulesLoaded, setIsRulesLoaded] = useState(false);
    const [isTasksLoaded, setIsTasksLoaded] = useState(false);
    const [isPlannerLoaded, setIsPlanerLoaded] = useState(false);

    useEffect(() => {
        if (activeKey === 'rules') {
            setIsRulesLoaded(true);
        } else if (activeKey === 'tasks') {
            setIsTasksLoaded(true);
        } else if (activeKey === 'planner') {
            setIsPlanerLoaded(true);
        }
    }, [activeKey]);

    useEffect(() => {
        if (!child)
            return;

        setStatuses(child.statuses);
        document.title = child.name;

        if (child.bigGoalId) {
            api.get("/deeds/" + child.bigGoalId)
                .then(({data}) => {
                    setBigGoal(data);
                })
                .catch(err => {
                    console.log(err);
                    alert(err.message);
                });
        }

        if (child.dreamId) {
            api.get("/deeds/" + child.dreamId)
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

    function invokeDeed(reward) {
        api.put("/deeds/" + reward.id + "/invoke?childId=" + child.id, reward)
            .then(({data}) => {
                dispatch(updateChild({...child, balance: data}));
                setIsGoodDeedPopupOpened(false);
                setIsBadDeedPopupOpened(false);
                setIsRewardsPopupOpened(false);
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
        api.delete("/children/" + childStatus.childId + "/status/" + childStatus.id)
            .then(({data}) => {
                setStatuses(prev => prev.filter(x => x.id !== childStatus.id));
            })
            .catch(err => {
                console.log(err);
                alert(err.message);
            });
    }

    function addChildStatus(text) {
        api.put(`/children/${childId}/status`, {text: text})
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
                                <RewardsPopup onChosen={(reward) => invokeDeed(reward)}
                                              isOpened={isRewardsPopupOpened}
                                              onOpenChanged={setIsRewardsPopupOpened}>
                                </RewardsPopup>
                                <GoodDeedsPopup onChosen={(reward) => invokeDeed(reward)}
                                                isOpened={isGoodDeedPopupOpened}
                                                onOpenChanged={setIsGoodDeedPopupOpened}>
                                </GoodDeedsPopup>
                                {/*<button className='btn btn-outline-primary button me-4 mt-4'*/}
                                {/*        onClick={() => setIsBadDeedPopupOpened(true)}>*/}
                                {/*    -*/}
                                {/*</button>*/}
                                {/*<BadDeedsPopup onChosen={(reward) => spendCoin(reward)}*/}
                                {/*               isOpened={isBadDeedPopupOpened}*/}
                                {/*               onOpenChanged={setIsBadDeedPopupOpened}>*/}
                                {/*</BadDeedsPopup>*/}
                            </div>
                            {/*<button className='btn btn-link' onClick={openCoinHistory} href="#">История монет</button>*/}
                            <ChildStatusList childStatuses={statuses}
                                             deleteChildStatus={deleteChildStatus}
                                             addChildStatus={addChildStatus}/>
                        </div>

                    </div>
                    <Tabs defaultActiveKey="habits"
                          id="habit-tabs"
                          activeKey={activeKey}
                          onSelect={(k) => setActiveKey(k)}
                          className="mt-4 mb-3">
                        <Tab eventKey="habits" title="Привычки">
                            <ChildHabits/>
                        </Tab>
                        <Tab eventKey="goals" title="Цели">
                            <div>
                                <h3>Цели</h3>
                                <div className='d-flex gap-4'>
                                    {bigGoal && <CardItem item={{...bigGoal, title: "Цель: " + bigGoal.title}}/>}
                                    {!bigGoal && <CardItem isEmpty={true} item={{title: "Выбрать цель"}}
                                                           onChoose={selectGoal}/>}
                                    {dream && <CardItem item={{...dream, title: "Мечта: " + dream.title}}/>}
                                    {!dream && <CardItem isEmpty={true} item={{title: "Выбрать мечту"}}
                                                         onChoose={selectDream}/>}
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="planner" title="Планирование">

                            {isPlannerLoaded &&
                                <GoogleAuthProvider>
                                    <Planner/>
                                </GoogleAuthProvider>
                            }
                        </Tab>
                        <Tab eventKey="rules" title="Правила">
                            {isRulesLoaded &&
                                <Rules/>
                            }
                        </Tab>
                        <Tab eventKey="tasks" title="Задачи">
                            {isTasksLoaded &&
                                <ChildTasks/>
                            }
                        </Tab>
                        <Tab eventKey="character-traits" title="Черты характера">
                            {activeKey === 'character-traits' &&
                                <ChildCharacterTraits/>
                            }
                        </Tab>
                    </Tabs>
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
