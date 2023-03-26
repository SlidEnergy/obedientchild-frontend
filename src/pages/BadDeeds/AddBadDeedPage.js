import {useState} from 'react';
import {http} from "../../core/http-common";
import {useNavigate} from "react-router-dom";
import ChooseImage from "../../components/ChooseImage";

const AddBadDeedPage = props => {
    const navigate = useNavigate();
    const [badDeed, setBadDeed] = useState({title: "", imageUrl: "", price: 1});

    function addBadDeed() {
        http.put("/baddeeds", badDeed)
            .then(() => {
                alert("success");
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
                   style={{
                       marginBottom: 20
                   }}
                   onChange={(e) => setBadDeed({...badDeed, title: e.target.value})}
                   value={badDeed.title}
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
                    <button onClick={() => setBadDeed({...badDeed, price: badDeed.price - 1})}>-</button>
                </div>
                <p style={{
                    width: 100,
                    textAlign: "center",
                }}>{badDeed.price}</p>
                <div style={{
                    width: 60
                }}>
                    <button onClick={() => setBadDeed({...badDeed, price: badDeed.price + 1})}>+</button>
                </div>
            </div>
            <button onClick={addBadDeed}>Добавить</button>
        </div>
    );
};

AddBadDeedPage.propTypes = {};

export default AddBadDeedPage;
