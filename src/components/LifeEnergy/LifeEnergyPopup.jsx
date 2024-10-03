import React, {useState, useEffect} from 'react';
import 'reactjs-popup/dist/index.css';
import NumberEdit from "../NumberEdit";

const LifeEnergyPopup = ({type, isOpened, onClosed}) => {
    let [model, setModel] = useState({title: "", amount: 1})

    useEffect(() => {
        document.documentElement.style.overflow = isOpened ? 'hidden' : "scroll";
        document.body.scroll = isOpened ? "no" : "yes";
    }, [isOpened])

    function submit(e) {
        e.preventDefault();

        onClosed?.(model)
    }

    return (
        <form onSubmit={submit} className='content-container'
              style={{display: isOpened ? "flex" : "none"}}>
            <input className='form-control' type={'text'}
                   onChange={(e) => setModel({...model, title: e.target.value})}
                   value={model.title}
                   placeholder="Название">
            </input>

            <NumberEdit value={model.amount}
                        onValueChanged={(value) => setModel({...model, amount: value})}>
            </NumberEdit>
            <button type='submit' className='btn btn-primary'>Добавить</button>
            <style jsx>{`
              .content-container {
                width: 100%;
                height: 100%;
                position: fixed;
                top: 0;
                left: 0;
                background-color: white;
                padding: 10px;
                overflow: auto;
                z-index: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1.5rem;
              }

              input {
                width: 400px;
              }

              .button {
                margin-top: 10px;
                height: 60px;
                width: 300px;
                font-size: 24px;
                border-radius: 2px;
                align-items: center;
                background-color: #337ab7;
                flex: 1;
              }
            `}</style>
        </form>
    );
};

export default LifeEnergyPopup;
