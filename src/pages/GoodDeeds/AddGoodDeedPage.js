import {useState} from 'react';
import {http} from "../../core/http-common";
import {useNavigate} from "react-router-dom";
import ChooseImage from "../../components/ChooseImage";
import NumberEdit from "../../components/NumberEdit";

const AddGoodDeedPage = props => {
    const navigate = useNavigate();
    const [goodDeed, setGoodDeed] = useState({title: "", imageUrl: "", price: 1});

    function addGoodDeed() {
        http.put("/gooddeeds", goodDeed)
            .then(() => {
                console.log("success");
                navigate("/gooddeeds");
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
                         onSearchTextChanged={(searchText) => setGoodDeed({...goodDeed, title: searchText})}
                         onImageChosen={(image) => setGoodDeed({...goodDeed, imageUrl: image})}>
            </ChooseImage>
            <input type={'text'}
                   onChange={(e) => setGoodDeed({...goodDeed, title: e.target.value})}
                   value={goodDeed.title}
                   placeholder="Название">
            </input>
            <NumberEdit style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: 100,
                marginBottom: 20
            }}
                        value={goodDeed.price}
                        onValueChanged={(value) => setGoodDeed({...goodDeed, price: value})}>
            </NumberEdit>
            <button onClick={addGoodDeed}>Добавить</button>
        </div>
    );
};

AddGoodDeedPage.propTypes = {};

export default AddGoodDeedPage;
