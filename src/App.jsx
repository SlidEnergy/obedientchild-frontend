import './App.css';
import HomePage from "./pages/HomePage";
import {Routes, Route, Router, Link} from "react-router-dom";
import ChildPage from "./pages/ChildPage";
import SelectDreamPage from "./pages/SelectDreamPage";
import SelectGoalPage from "./pages/SelectGoalPage";
import RewardsPage from "./pages/Rewards/RewardsPage";
import AddRewardPage from "./pages/Rewards/AddRewardPage";
import EditRewardPage from "./pages/Rewards/EditRewardPage";
import BadDeedsPage from "./pages/BadDeeds/BadDeedsPage";
import EditBadDeedPage from "./pages/BadDeeds/EditBadDeedPage";
import AddBadDeedPage from "./pages/BadDeeds/AddBadDeedPage";
import GoodDeedsPage from "./pages/GoodDeeds/GoodDeedsPage";
import EditGoodDeedPage from "./pages/GoodDeeds/EditGoodDeedPage";
import AddGoodDeedPage from "./pages/GoodDeeds/AddGoodDeedPage";
import CoinHistoryPage from "./pages/CoinHistoryPage";
import HabitsPage from "./pages/Habits/HabitsPage";
import EditHabitPage from "./pages/Habits/EditHabitPage";
import AddHabitPage from "./pages/Habits/AddHabitPage";
import SelectHabitPage from "./pages/SelectHabitPage";
import SelectGoodDeedPage from "./pages/SelectGoodDeedPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import LifeEnergyHistoryPage from "./pages/LifeEnergyHistoryPage";
import {useEffect, useState} from "react";
import {AuthProvider, useAuth} from "./core/Auth/AuthContext";
import AuthGuard from "./core/Auth/AuthGuard";
import GoogleCalendarWebhookPage from "./pages/GoogleCalendarWebhookPage";

function App() {
    const {refreshIsAuthenticated} = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        refreshIsAuthenticated().finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div>Загрузка...</div>; // Пока идет проверка токена
    }

    return (
        <div className="App">
            <header className="App-header">
                <Link to="/">Главная</Link>
                <Link to="/settings">Настройки</Link>
            </header>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route element={<AuthGuard/>}>
                    <Route path="/" element={<HomePage/>}>
                        <Route path="/children/:childId">
                            <Route path="/children/:childId/" element={<ChildPage/>}/>
                            <Route path="/children/:childId/SelectGoal" element={<SelectGoalPage/>}/>
                            <Route path="/children/:childId/SelectDream" element={<SelectDreamPage/>}/>
                            <Route path="/children/:childId/habits/" element={<SelectHabitPage/>}/>
                            <Route path="/children/:childId/childtasks/" element={<SelectGoodDeedPage/>}/>
                        </Route>
                    </Route>
                    <Route path="/coinhistory/:childId" element={<CoinHistoryPage/>}/>
                    <Route path="/lifeenergy/history" element={<LifeEnergyHistoryPage/>}/>
                    <Route path="/settings" element={<SettingsPage/>}/>

                    <Route path="/rewards">
                        <Route path="/rewards/" element={<RewardsPage/>}/>
                        <Route path="/rewards/:rewardId/" element={<EditRewardPage/>}/>
                        <Route path="/rewards/add/" element={<AddRewardPage/>}/>
                    </Route>
                    <Route path="/gooddeeds">
                        <Route path="/gooddeeds/" element={<GoodDeedsPage/>}/>
                        <Route path="/gooddeeds/:goodDeedId/" element={<EditGoodDeedPage/>}/>
                        <Route path="/gooddeeds/add/" element={<AddGoodDeedPage/>}/>
                    </Route>
                    <Route path="/baddeeds">
                        <Route path="/baddeeds/" element={<BadDeedsPage/>}/>
                        <Route path="/baddeeds/:badDeedId/" element={<EditBadDeedPage/>}/>
                        <Route path="/baddeeds/add/" element={<AddBadDeedPage/>}/>
                    </Route>
                    <Route path="/habits">
                        <Route path="/habits/" element={<HabitsPage/>}/>
                        <Route path="/habits/:habitId/" element={<EditHabitPage/>}/>
                        <Route path="/habits/add/" element={<AddHabitPage/>}/>
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
