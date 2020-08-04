import React, {useState} from 'react';
import { View, TextInput, Text } from 'react-native';
import * as SecureStore from "expo-secure-store";

import api from "../utils/api";
import PostImagePicker from "../components/posts/postImagePicker";
import Button from '../components/helpers/Button';

export default () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const buildForm = () => {
    let formData = new FormData();

    formData.append("post[name]", name);
    formData.append("post[content]", content);

    const uriParts = postImage.split(".");
    const fileType = uriParts[uriParts.length -1]; //?

    formData.append("post[post_image]", {
      // @ats-ignore
      uri: postImage,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    return formData;
  };

  const handleSubmit = async () => {
    const token = await SecureStore.getItemAsync("memipedia_secure_token");
    setIsSubmitting(true);

    api
      .post("memipedia_posts", buildForm(), {
       headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application.json",
        "Content-Type": "multipart/form-data",  
      },  
    })
    .then((response) => {
      console.log("res from creating a new post", response.data);
      setIsSubmitting(false);
    })
    .catch((error) => {
      console.log("error from creating new post", error);
      setIsSubmitting(false);
    });
  }

  return (
   <View style={{ height: "100%" }}>
     <TextInput
          placeholder="Name"
          value={name}
          onChangeText={val => setName(val)}
        />
        
        <TextInput
          placeholder="Add meme explanation here"
          value={content}
          onChangeText={(val) => setContent(val)}
          style={{ borderWidth: 2, borderColor: "black" }}
        />
  
    <View style={{ marginTop: 40, height: 100 }}>
      <PostImagePicker setPostImage= {setPostImage} />
    </View>

    {isSubmitting ? (
      <Button text="Submitting..." disabled />
    ) : (
      <Button text="Submit"onPress={handleSubmit} />
    )}
   </View>
  );
};