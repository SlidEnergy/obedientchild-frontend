import {useEffect, useState} from 'react';
import Coins from "../../components/Coins";
import {http} from "../../core/http-common";
import {useNavigate, useParams} from "react-router-dom";
import LoadingIndicator from "../../components/LoadingIndicator";
import ChooseImage from "../../components/ChooseImage";

const EditRewardPage = props => {
    const navigate = useNavigate();
    const {rewardId} = useParams();
    const [reward, setReward] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [imageEditMode, setImageEditMode] = useState(false);

    useEffect(() => {
        document.title = "Редактирование награды";
        setIsLoading(true);

        http.get("/rewards/" + rewardId)
            .then(({data}) => {
                setReward(data);
            })
            .catch((err => {
                console.log(err);
                alert(err.message);
            }))
            .finally(() => {
                setIsLoading(false);
            })
    }, [])

    function deleteReward() {
        http.delete("/rewards/" + rewardId)
            .then(() => {
                alert("success");
                navigate("/rewards");
            })
            .catch(err => {
                console.log(err);
                alert(err.message);
            });
    }

    function saveReward() {
        http.post("/rewards/" + rewardId, reward)
            .then(() => {
                alert("success");
                navigate("/rewards");
            })
            .catch(err => {
                console.log(err);
                alert(err.message);
            });
    }

    return (
        <div>
            <div style={styles.container}>
                <LoadingIndicator isLoading={isLoading}></LoadingIndicator>
                {reward && <div style={styles.row}>
                    {!imageEditMode &&
                        <img style={{
                            width: 105,
                            height: 105,
                            marginRight: 20,
                            borderRadius: 10,
                            cursor: "pointer"
                        }}
                             onClick={() => setImageEditMode(true)}
                             src={reward.imageUrl}>
                        </img>
                    }
                    {imageEditMode &&
                        <ChooseImage style={{
                            marginBottom: 20
                        }}
                                     text={reward.title}
                                     onImageChosen={(image) => setReward({...reward, imageUrl: image})}>
                        </ChooseImage>
                    }
                    <div style={styles.column}>
                        <input type="text" style={{
                            fontSize: 24,
                            marginBottom: 10
                        }} value={reward.title}
                               onChange={(e) => setReward({...reward, title: e.target.value})}></input>
                        <Coins count={reward.price} size={22}></Coins>
                    </div>
                </div>}
                <button style={styles.button} onClick={saveReward}>Сохранить</button>
                <button style={styles.button} onClick={deleteReward}>Удалить</button>
            </div>
        </div>
    );
};

EditRewardPage.propTypes = {};

const styles = {
    container: {
        padding: 20,
        flexDirection: "column",
    },
    row: {
        flexDirection: "row",
        flex: 1
    },
    column: {
        flexDirection: "column",
        flex: 1
    },
    button: {
        marginTop: 20,
    }
};

export default EditRewardPage;
