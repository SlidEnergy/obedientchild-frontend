import {useState} from 'react';
import {http} from "../../core/http-common";
import {useNavigate} from "react-router-dom";
import ChooseImage from "../../components/ChooseImage";

const AddRewardPage = props => {
    document.title = "Добавить награду";
    const navigate = useNavigate();

    const [reward, setReward] = useState({title: "", imageUrl: "", price: 1});

    function addReward() {
        http.put("/rewards", reward)
            .then(() => {
                alert("success");
                navigate("/rewards");
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
                         onSearchTextChanged={(searchText) => setReward({...reward, title: searchText})}
                         onImageChosen={(image) => setReward({...reward, imageUrl: image})}>
            </ChooseImage>
            <input
                type={'text'}
                style={{
                    marginBottom: 20
                }}
                onChange={(e) => setReward({...reward, title: e.target.value})}
                value={reward.title}
                placeholder="Название">
            </input>

            <div style={{
                flexDirection: "row",
                marginBottom: 20,
                width: 220,
                alignItems: "center"
            }}>
                <div style={{
                    width: 60
                }}>
                    <button onClick={() => setReward({...reward, price: reward.price - 1})}>-</button>
                </div>
                <p style={{
                    width: 100,
                    textAlign: "center",
                }}>{reward.price}</p>
                <div style={{
                    width: 60
                }}>
                    <button onClick={() => setReward({...reward, price: reward.price + 1})}>+</button>
                </div>
            </div>
            <button onClick={addReward}>Добавить</button>
        </div>
    );
};

AddRewardPage.propTypes = {};

export default AddRewardPage;
