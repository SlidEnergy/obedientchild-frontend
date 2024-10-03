import {useEffect, useState} from 'react';
import Coins from "../../components/Coins";
import {http} from "../../core/http-common";
import {useNavigate, useParams} from "react-router-dom";
import ChooseImage from "../../components/ChooseImage";
import CharacterTraits from "../../components/CharacterTraits/CharacterTraits";

const EditHabitPage = props => {
    const navigate = useNavigate();
    const {habitId} = useParams();
    const [habit, setHabit] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [imageEditMode, setImageEditMode] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        http.get("/deeds/" + habitId)
            .then(({data}) => {
                setHabit(data);
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [])

    function saveHabit(e) {
        e.preventDefault();

        http.post("/deeds/" + habitId, habit)
            .then(() => {
                console.log("success");
                navigate("/habits");
            })
            .catch(err => {
                console.log(err);
                alert(err);
            });
    }

    function deleteHabit() {
        http.delete("/deeds/" + habitId)
            .then(() => {
                console.log("success");
                navigate("/habits");
            })
            .catch(err => {
                console.log(err);
                alert(err);
            });
    }

    // Функция для обновления поля CharacterTraitIds в модели habit
    const characterTrait_onSelectedIdsChanged = (newCharacterTraitIds) => {
        setHabit((prevHabit) => ({
            ...prevHabit,
            characterTraitIds: newCharacterTraitIds
        }));
    };

    return (
        <form onSubmit={saveHabit} className='page-container'>
            {habit && <div className='item-container'>
                {!imageEditMode && <img onClick={() => setImageEditMode(true)} src={habit.imageUrl} alt='habit'/>}
                {imageEditMode &&
                    <ChooseImage style={{
                        marginBottom: 20,
                    }}
                                 text={habit.title}
                                 onImageChosen={(image) => setHabit({...habit, imageUrl: image})}>
                    </ChooseImage>
                }
                <input className='form-control' type="text" value={habit.title}
                       onChange={(e) => setHabit({...habit, title: e.target.value})}>
                </input>
                <Coins count={habit.price} size={22}/>
                Выберите черты характера, которые развивает данная привычка
                <CharacterTraits selectedIds={habit.characterTraitIds} onSelectedIdsChanged={characterTrait_onSelectedIdsChanged}/>
            </div>}
            <div className='button-container'>
                <button type='submit' className='btn btn-primary'>Сохранить</button>
                <button className='btn btn-danger' onClick={deleteHabit}>Удалить</button>
            </div>
            <style jsx>{`
              .page-container {
                padding: 1.5rem;
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
                align-items: center;
              }

              .item-container {
                margin: 0 auto;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1.5rem;
              }

              input {
                width: 300px;
              }

              img {
                width: 105px;
                height: 105px;
                margin-right: 30px;
                border-radius: 10px;
                cursor: pointer;
              }

              .button-container {
                display: flex;
                gap: 1.5rem;
                align-items: center;
              }
            `}</style>
        </form>
    );
};

export default EditHabitPage;
