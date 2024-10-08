import {useState} from 'react';
import {api} from "../../core/api";
import {useNavigate} from "react-router-dom";
import ChooseImage from "../../components/ChooseImage";
import NumberEdit from "../../components/NumberEdit";

const AddHabitPage = props => {
    const navigate = useNavigate();
    const [habit, setHabit] = useState({title: "", imageUrl: "", price: 1, type: 'Habit'});

    function addHabit() {
        api.put("/deeds", habit)
            .then(() => {
                console.log("success");
                navigate("/habits");
            })
            .catch(err => {
                console.log(err);
                alert(err);
            });
    }

    return (
        <div style={{
            alignItems: "center",
            alignContent: "center",
            flexDirection: "column",
            padding: 20
        }}>
            <ChooseImage style={{
                marginBottom: 20
            }}
                         onSearchTextChanged={(searchText) => setHabit({...habit, title: searchText})}
                         onImageChosen={(image) => setHabit({...habit, imageUrl: image})}>
            </ChooseImage>
            <input type={'text'}
                   onChange={(e) => setHabit({...habit, title: e.target.value})}
                   value={habit.title}
                   placeholder="Название">
            </input>
            <NumberEdit style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: 100,
                marginBottom: 20
            }}
                        value={habit.price}
                        onValueChanged={(value) => setHabit({...habit, price: value})}>
            </NumberEdit>
            <button onClick={addHabit}>Добавить</button>
        </div>
    );
};

AddHabitPage.propTypes = {};

export default AddHabitPage;
