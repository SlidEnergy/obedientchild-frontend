import './App.css';
import HomePage from "./pages/HomePage";
import {Routes, Route, Router} from "react-router-dom";
import ChildPage from "./pages/ChildPage";

function App() {
    return (
        <div className="App">
            <header className="App-header">
            </header>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/children/:childId" element={<ChildPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
