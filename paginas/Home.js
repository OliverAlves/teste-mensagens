import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Home = ({ navigation }) => {
  const [usuario, setUsuario] = useState("");

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...

      console.log("usuario Logadosr");
      setUsuario(user.uid);
      console.log(usuario);
    } else {
      navigation.navigate("Login");
      console.log("Usuário não Logado");
    }
    p;
  });
  useEffect(() => {
    console.log("usuario");
    console.log(usuario);

    const unsubscribe = navigation.addListener("focus", () => {
      if (usuario === "") {
        navigation.navigate("Login");
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View>
      <Button
        onPress={() => navigation.navigate("ChannelList")}
        title="Ver Chamados"
      />
    </View>
  );
};

export default Home;
