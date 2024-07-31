import {useState} from 'react';
import {http} from "../../core/http-common";
import {useNavigate} from "react-router-dom";
import ChooseImage from "../../components/ChooseImage";
import NumberEdit from "../../components/NumberEdit";

const AddBadDeedPage = props => {
    const navigate = useNavigate();
    const [badDeed, setBadDeed] = useState({title: "", imageUrl: "", price: 1});

    function addBadDeed() {
        http.put("/baddeeds", badDeed)
            .then(() => {
                console.log("success");
                navigate("/baddeeds");
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
                         onSearchTextChanged={(searchText) => setBadDeed({...badDeed, title: searchText})}
                         onImageChosen={(image) => setBadDeed({...badDeed, imageUrl: image})}>
            </ChooseImage>
            <input type={'text'}
                   onChange={(e) => setBadDeed({...badDeed, title: e.target.value})}
                   value={badDeed.title}
                   placeholder="Название">
            </input>

            <NumberEdit style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: 100,
                marginBottom: 20
            }}
                        value={badDeed.price}
                        onValueChanged={(value) => setBadDeed({...badDeed, price: value})}>
            </NumberEdit>
            <button onClick={addBadDeed}>Добавить</button>
        </div>
    );
};

AddBadDeedPage.propTypes = {};

export default AddBadDeedPage;
