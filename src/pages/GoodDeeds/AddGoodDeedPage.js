import React, {useState} from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from "../../components/LoadingIndicator";
import {http} from "../../core/http-common";
import {useNavigate} from "react-router-dom";

const AddGoodDeedPage = props => {
    const navigate = useNavigate();
    const [goodDeed, setGoodDeed] = useState({title: "", imageUrl: "", price: 1});
    const [images, setImages] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function searchImages() {
        setGoodDeed({...goodDeed, title: searchText});

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
                                <div key={image} onClick={() => setGoodDeed({...goodDeed, imageUrl: image})}>
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
            }} onChange={(e) => setGoodDeed({...goodDeed, title: e.target.value})}
                   value={goodDeed.title}
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

AddGoodDeedPage.propTypes = {

};

export default AddGoodDeedPage;
