import {useEffect, useState} from 'react';
import Coins from "../../components/Coins";
import {api} from "../../core/api";
import {useNavigate, useParams} from "react-router-dom";
import ChooseImage from "../../components/ChooseImage";

const EditGoodDeedPage = props => {
    const navigate = useNavigate();
    const {goodDeedId} = useParams();
    const [goodDeed, setGoodDeed] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [imageEditMode, setImageEditMode] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        api.get("/deeds/" + goodDeedId)
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
        api.post("/deeds/" + goodDeedId, goodDeed)
            .then(() => {
                console.log("success");
                navigate("/gooddeeds");
            })
            .catch(err => {
                console.log(err);
                alert(err);
            });
    }

    function deleteGoodDeed() {
        api.delete("/deeds/" + goodDeedId)
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
            padding: 20
        }}>
            {goodDeed && <div>
                {!imageEditMode &&
                    <img style={{
                        width: 105,
                        height: 105,
                        marginRight: 30,
                        borderRadius: 10,
                        cursor: "pointer"
                    }}
                         onClick={() => setImageEditMode(true)}
                         src={goodDeed.imageUrl}>
                    </img>
                }
                {imageEditMode &&
                    <ChooseImage style={{
                        marginBottom: 20,
                    }}
                                 text={goodDeed.title}
                                 onImageChosen={(image) => setGoodDeed({...goodDeed, imageUrl: image})}>
                    </ChooseImage>
                }

                <div style={{
                    flexDirection: "column"
                }}>
                    <input type="text" style={{
                        fontSize: 24,
                        marginBottom: 10
                    }} value={goodDeed.title}
                           onChange={(e) => setGoodDeed({...goodDeed, title: e.target.value})}>
                    </input>
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
