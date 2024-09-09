import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import 'reactjs-popup/dist/index.css';
import NumberEdit from "../NumberEdit";

const LifeEnergyPopup = props => {
    let [model, setModel] = useState({ title: "", amount: 1})

    useEffect(() => {
        document.documentElement.style.overflow = props.isOpened ? 'hidden' : "scroll";
        document.body.scroll = props.isOpened ? "no" : "yes";
    },[props.isOpened])

    return (
        <div style={{...styles.container, ...{...{display: props.isOpened ? "block" : "none" }}}}>
            <input type={'text'}
                   onChange={(e) => setModel({...model, title: e.target.value})}
                   value={model.title}
                   placeholder="Название">
            </input>

            <NumberEdit style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: 100,
                marginBottom: 20
            }}
                        value={model.amount}
                        onValueChanged={(value) => setModel({...model, price: value})}>
            </NumberEdit>
            <button onClick={() => props.onClosed(model)}>Добавить</button>
        </div>
    );
};

const styles = {
    container: {
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "white",
        padding: 10,
        overflow: "auto"
    },
    button: {
        marginTop: 10,
        height: 60,
        width: 300,
        fontSize: 24,
        borderRadius: 2,
        alignItems: "center",
        backgroundColor: "#337ab7",
        flex: 1,
    }
}

LifeEnergyPopup.propTypes = {
    type: PropTypes.string,
    isOpened: PropTypes.bool,
    onClosed: PropTypes.func
};

export default LifeEnergyPopup;
