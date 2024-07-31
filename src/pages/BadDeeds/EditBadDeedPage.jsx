import {useEffect, useState} from 'react';
import Coins from "../../components/Coins";
import {http} from "../../core/http-common";
import {useNavigate, useParams} from "react-router-dom";
import ChooseImage from "../../components/ChooseImage";

const EditBadDeedPage = props => {
    const navigate = useNavigate();
    const {badDeedId} = useParams();
    const [badDeed, setBadDeed] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [imageEditMode, setImageEditMode] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        http.get("/baddeeds/" + badDeedId)
            .then(({data}) => {
                setBadDeed(data);
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [])

    function saveBadDeed() {
        http.post("/baddeeds/" + badDeedId, badDeed)
            .then(() => {
                console.log("success");
                navigate("/baddeeds");
            })
            .catch(err => {
                console.log(err);
                alert(err);
            });
    }

    function deleteBadDeed() {
        http.delete("/baddeeds/" + badDeedId)
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
        <div>
            {badDeed && <div style={{
                flexDirection: "row"
            }}>
                {!imageEditMode &&
                    <img style={{
                        width: 105,
                        height: 105,
                        marginRight: 30,
                        borderRadius: 10,
                        cursor: "pointer"
                    }}
                         onClick={() => setImageEditMode(true)}
                         src={badDeed.imageUrl}>
                    </img>
                }
                {imageEditMode &&
                    <ChooseImage style={{
                        marginBottom: 20
                    }}
                                 text={badDeed.title}
                                 onImageChosen={(image) => setBadDeed({...badDeed, imageUrl: image})}>
                    </ChooseImage>
                }
                <div style={{
                    flexDirection: "column"
                }}>
                    <input type="text" style={{
                        fontSize: 24,
                        marginBottom: 10
                    }} value={badDeed.title}
                           onChange={(e) => setBadDeed({...badDeed, title: e.target.value})}></input>
                    <div style={{
                        flexDirection: "row"
                    }}>
                        <Coins count={badDeed.price} size={22}></Coins>
                    </div>
                </div>
            </div>}
            <button onClick={saveBadDeed}>Сохранить</button>
            <button onClick={deleteBadDeed}>Удалить</button>
        </div>
    );
};

EditBadDeedPage.propTypes = {};

export default EditBadDeedPage;
