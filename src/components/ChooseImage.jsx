import PropTypes from 'prop-types';
import LoadingIndicator from "./LoadingIndicator";
import {http} from "../core/http-common";
import {useEffect, useState} from "react";

const ChooseImage = props => {
    const [images, setImages] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setSearchText(props.text);
    })

    function searchImages() {
        if(props.onSearchTextChanged)
            props.onSearchTextChanged(searchText);

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

    return (
        <div style={props.style}>
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
                                <div key={image} onClick={() => props.onImageChosen(image)}>
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
        </div>
    );
};

ChooseImage.propTypes = {
    style: PropTypes.any,
    text: PropTypes.string,
    onSearchTextChanged: PropTypes.func,
    onImageChosen: PropTypes.func,
};

export default ChooseImage;
