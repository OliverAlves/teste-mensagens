import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Button,
} from "react-native";
import React, { useState } from "react";

import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase_config";

const GerarOcamento = ({ route, navigation }) => {
  const [valor, setValor] = useState("");
  const { canal, valorAtual, codigo_stream, codigoFirebase } = route.params;

  //console.log(canal);
  console.log("codigoFirebase");
  console.log(codigoFirebase);

  const gravarOrcamento = async () => {
    console.log("gravarOrcamento");

    try {
      const docRef = await addDoc(collection(db, "orcamentos"), {
        first: "Oliver",
        valor: valor,
        codigo_stream: canal,
      });
      console.log("Document written with ID: ", docRef.id);

      navigation.goBack();
    } catch (e) {
      console.error("Error adding document: ", e);
      navigation.goBack();
    }
  };

  const atualizarOrcamento = async () => {
    console.log("atualizarOrcamento");
    try {
      const docRef = doc(db, "orcamentos", codigoFirebase);
      const data = {
        valor: valor,
      };
      setDoc(docRef, data, { merge: true })
        .then((docRef) => {
          console.log("Entire Document has been updated successfully");

          navigation.goBack();
        })

        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Orçamento</Text>

        <TextInput
          placeholder="Informe o Valor do Orçamento!"
          style={Styles.input}
          onChangeText={(newText) => setValor(newText)}
          value={valor}
        />
      </View>

      <Button
        onPress={() => {
          if (isNaN(valorAtual) !== false) {
            gravarOrcamento();
          } else {
            atualizarOrcamento();
          }
        }}
        title={
          isNaN(parseFloat(valorAtual)) !== false
            ? "Adicinar Orçamento"
            : "Alterar Orçamento"
        }
        color="#841584"
      />

      {isNaN(valorAtual) === false && (
        <Text>Valor Atual é de {valorAtual}</Text>
      )}
    </SafeAreaView>
  );
};

export default GerarOcamento;

const Styles = StyleSheet.create({
  input: {
    padding: 15,
    backgroundColor: "white",
    marginTop: 5,
  },
});
