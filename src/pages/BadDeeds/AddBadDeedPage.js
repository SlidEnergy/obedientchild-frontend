import React, {useState} from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from "../../components/LoadingIndicator";
import {http} from "../../core/http-common";
import {useNavigate} from "react-router-dom";

const AddBadDeedPage = props => {
    const navigate = useNavigate();
    const [badDeed, setBadDeed] = useState({title: "", imageUrl: "", price: 1});
    const [images, setImages] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function searchImages() {
        setBadDeed({...badDeed, title: searchText});

        setIsLoading(true);
        http.get("/images/search?q=" + searchText)
            .then(({data}) => {
                setImages(data);
            })
            .catch(err => {
                console.log(err);
                alert(err.message);
            })
            .finally(() => setIsLoading(false));
    }

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
            <div style={{
                flexDirection: "row"
            }}>
                <input type='text' style={{marginRight: 20}} onChange={(e) => setSearchText(e.target.value)}
                       value={searchText}
                       placeholder="Награда, например 'Торт'"
                ></input>
                <button onClick={searchImages}>Искать</button>
            </div>
            <div style={{
                height: 300
            }}>
                <LoadingIndicator isLoading={isLoading}></LoadingIndicator>

                {!isLoading && <div style={{}}>
                    <div style={{
                        marginTop: 20,
                    }}>
                        <div style={{
                            height: 300,
                            overflow: "auto",
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap"
                        }}>
                            {images.map(image =>
                                <div key={image} onClick={() => setBadDeed({...badDeed, imageUrl: image})}>
                                    <img style={{
                                        width: 105,
                                        height: 105,
                                        marginRight: 10,
                                        marginBottom: 10
                                    }}
                                         src={image}>
                                    </img>
                                </div>
                            )}

                        </div>
                    </div>
                </div>}
            </div>

            <input type={'text'} style={{
                marginBottom: 20
            }} onChange={(e) => setBadDeed({...badDeed, title: e.target.value})}
                   value={badDeed.title}
                   placeholder="Название"
            ></input>

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

AddBadDeedPage.propTypes = {

};

export default AddBadDeedPage;
