import React, {useState} from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {http} from "../core/http-common";

const AddRewardScreen = ({navigation}) => {
    const [reward, setReward] = useState({title: "", imageUrl: "", price: 1});
    const [images, setImages] = useState([]);
    const [searchText, setSearchText] = useState();
    const [isLoading, setIsLoading] = useState(false);

    function onSearchTextChange(text) {
        setSearchText(text);
        setReward({...reward, title: text});

        setIsLoading(true);
        http.get("/images/search?q=" + text)
            .then(({data}) => {
                setImages(data);
            })
            .catch(err => {
                console.log(err);
                Alert.alert("Error", err);
            })
            .finally(() => setIsLoading(false));
    }

    function addReward() {
        http.put("/rewards", reward)
            .then(() => {
                Alert.alert("Success", "success");
                navigation.navigate("Rewards");
            })
            .catch(err => {
                console.log(err);
                Alert.alert("Error", err);
            });
    }

    return (
        <View style={{
            alignItems: "center",
            alignContent: "center",
            flexDirection: "column",
            padding: 20
        }}>
            <TextInput onChangeText={onSearchTextChange}
                       value={searchText}
                       placeholder="Поиск"
            ></TextInput>

            <View style={{
                height: 300
            }}>
                {isLoading && <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size="large"></ActivityIndicator>
                    <Text style={{
                        marginTop: 15
                    }}>Loading...</Text>
                </View>}

                {!isLoading && <View style={{}}>
                    <ScrollView style={{
                        height: 400
                    }}>
                        <View style={{
                            flexDirection: "row",
                            flexWrap: "wrap"
                        }}>

                            {images.map(image =>
                                <TouchableOpacity onPress={() => setReward({...reward, imageUrl: image})}>
                                    <Image key={image} style={{
                                        width: 105,
                                        height: 105,
                                        marginRight: 10,
                                        marginBottom: 10
                                    }}
                                           source={{
                                               uri: image
                                           }}>
                                    </Image>
                                </TouchableOpacity>
                            )}

                        </View>
                    </ScrollView>
                </View>}
            </View>

            <TextInput style={{
                marginBottom: 20
            }} onChangeText={(text) => setReward({...reward, title: text})}
                       value={reward.title}
                       placeholder="Название"
            ></TextInput>

            <View style={{
                flexDirection: "row",
                marginBottom: 20,
                width: 220,
                alignItems: "center"
            }}>
                <View style={{
                    width: 60
                }}>
                    <Button title="-" onPress={() => setReward({...reward, price: reward.price - 1})}></Button>
                </View>
                <Text style={{
                    width: 100,
                    textAlign: "center",
                }}>{reward.price}</Text>
                <View style={{
                    width: 60
                }}>
                    <Button title="+" onPress={() => setReward({...reward, price: reward.price + 1})}></Button>
                </View>
            </View>
            <Button title="Добавить" onPress={addReward}></Button>
        </View>
    );
};

export default AddRewardScreen;