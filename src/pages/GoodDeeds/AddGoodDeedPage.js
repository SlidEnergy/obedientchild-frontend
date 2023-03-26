import {useState} from 'react';
import {http} from "../../core/http-common";
import {useNavigate} from "react-router-dom";
import ChooseImage from "../../components/ChooseImage";

const AddGoodDeedPage = props => {
    const navigate = useNavigate();
    const [goodDeed, setGoodDeed] = useState({title: "", imageUrl: "", price: 1});

    function addGoodDeed() {
        http.put("/gooddeeds", goodDeed)
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
                   style={{
                       marginBottom: 20
                   }}
                   onChange={(e) => setGoodDeed({...goodDeed, title: e.target.value})}
                   value={goodDeed.title}
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
                    <button onClick={() => setGoodDeed({...goodDeed, price: goodDeed.price - 1})}>-</button>
                </div>
                <p style={{
                    width: 100,
                    textAlign: "center",
                }}>{goodDeed.price}</p>
                <div style={{
                    width: 60
                }}>
                    <button onClick={() => setGoodDeed({...goodDeed, price: goodDeed.price + 1})}>+</button>
                </div>
            </div>
            <button onClick={addGoodDeed}>Добавить</button>
        </div>
    );
};

AddGoodDeedPage.propTypes = {};

export default AddGoodDeedPage;
