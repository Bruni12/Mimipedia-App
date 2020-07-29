import React from 'react';
import { Text, View, } from 'react-native';
import PostImagePicker from "../components/posts/postImagePicker";

export default () => {
  return (
   <View style={{ height: "100%" }}>
    <Text>Post Form Screen</Text>

    

    <View style={{ marginTop: 40, height: 100 }}>
      <PostImagePicker />
    </View>
   </View>
  );
};