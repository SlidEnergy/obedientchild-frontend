import {useEffect, useState} from 'react';
import Coins from "../../components/Coins";
import {http} from "../../core/http-common";
import {useNavigate, useParams} from "react-router-dom";
import ChooseImage from "../../components/ChooseImage";

const EditHabitPage = props => {
    const navigate = useNavigate();
    const {habitId} = useParams();
    const [habit, setHabit] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [imageEditMode, setImageEditMode] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        http.get("/gooddeeds/" + habitId)
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

    function saveHabit() {
        http.post("/gooddeeds/" + habitId, habit)
            .then(() => {
                alert("success");
                navigate("/gooddeeds");
            })
            .catch(err => {
                console.log(err);
                alert(err);
            });
    }

    function deleteHabit() {
        http.delete("/gooddeeds/" + habitId)
            .then(() => {
                alert("success");
                navigate("/gooddeeds");
            })
            .catch(err => {
                console.log(err);
                alert(err);
            });
    }

    return (
        <div style={{
            padding: 20
        }}>
            {habit && <div>
                {!imageEditMode &&
                    <img style={{
                        width: 105,
                        height: 105,
                        marginRight: 30,
                        borderRadius: 10,
                        cursor: "pointer"
                    }}
                         onClick={() => setImageEditMode(true)}
                         src={habit.imageUrl}>
                    </img>
                }
                {imageEditMode &&
                    <ChooseImage style={{
                        marginBottom: 20,
                    }}
                                 text={habit.title}
                                 onImageChosen={(image) => setHabit({...habit, imageUrl: image})}>
                    </ChooseImage>
                }

                <div style={{
                    flexDirection: "column"
                }}>
                    <input type="text" style={{
                        fontSize: 24,
                        marginBottom: 10
                    }} value={habit.title}
                           onChange={(e) => setHabit({...habit, title: e.target.value})}>
                    </input>
                    <div style={{
                        flexDirection: "row"
                    }}>
                        <Coins count={habit.price} size={22}></Coins>
                    </div>
                </div>
            </div>}
            <button onClick={saveHabit}>Сохранить</button>
            <button onClick={deleteHabit}>Удалить</button>
        </div>
    );
};

EditHabitPage.propTypes = {};

export default EditHabitPage;
