import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Coins from "../../components/Coins";
import {http} from "../../core/http-common";
import {useNavigate, useParams} from "react-router-dom";

const EditGoodDeedPage = props => {
    const navigate = useNavigate();
    const {goodDeedId} = useParams();
    const [goodDeed, setGoodDeed] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        http.get("/gooddeeds/" + goodDeedId)
            .then(({data}) => {
                setGoodDeed(data);
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [])

    function saveGoodDeed() {
        http.post("/gooddeeds/" + goodDeedId, goodDeed)
            .then(() => {
                alert("success");
                navigate("/gooddeeds");
            })
            .catch(err => {
                console.log(err);
                alert(err);
            });
    }

    function deleteGoodDeed() {
        http.delete("/gooddeeds/" + goodDeedId)
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
        <div>
            {goodDeed && <div style={{
                flexDirection: "row"
            }}>
                <img style={{
                    width: 105,
                    height: 105,
                    marginRight: 30,
                    borderRadius: 10
                }}
                     src={goodDeed.imageUrl}></img>
                <div style={{
                    flexDirection: "column"
                }}>
                    <input type="text" style={{
                        fontSize: 24,
                        marginBottom: 10
                    }} value={goodDeed.title}
                           onChange={(e) => setGoodDeed({...goodDeed, title: e.target.value})}></input>
                    <div style={{
                        flexDirection: "row"
                    }}>
                        <Coins count={goodDeed.price} size={22}></Coins>
                    </div>
                </div>
            </div>}
            <button onClick={saveGoodDeed}>Сохранить</button>
            <button onClick={deleteGoodDeed}>Удалить</button>
        </div>
    );
};

EditGoodDeedPage.propTypes = {};

export default EditGoodDeedPage;
