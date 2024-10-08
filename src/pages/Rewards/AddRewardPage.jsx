import {useState} from 'react';
import {api} from "../../core/api";
import {useNavigate} from "react-router-dom";
import ChooseImage from "../../components/ChooseImage";
import NumberEdit from "../../components/NumberEdit";

const AddRewardPage = props => {
    document.title = "Добавить награду";
    const navigate = useNavigate();

    const [reward, setReward] = useState({title: "", imageUrl: "", price: 1, type: 'Reward'});

    function addReward() {
        api.put("/deeds", reward)
            .then(() => {
                console.log("success");
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
                onChange={(e) => setReward({...reward, title: e.target.value})}
                value={reward.title}
                placeholder="Название">
            </input>
            <NumberEdit style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: 100,
                marginBottom: 20
            }}
                        value={reward.price}
                        onValueChanged={(value) => setReward({...reward, price: value})}>
            </NumberEdit>
            <button onClick={addReward}>Добавить</button>
        </div>
    );
};

AddRewardPage.propTypes = {};

export default AddRewardPage;
