import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import * as Animatable from "react-native-animatable";


export default function App() {
  const [isTextAnimated, setIsTextAnimated] = useState(false);
  const [numberIsGuessed, setNumberIsGuessed] = useState(false);
  const [number,setNumber] = useState(Math.floor(Math.random() * 10) + 1);
  const [numberOfTries, setNumberOfTries] = useState(0);
  const [hintText, setHintText] = useState("");
  const [triedNumbers, setTriedNumbers] = useState([]);
  const [inputText, setInputText] = useState("");

  const restartGame = () => {
    setNumberIsGuessed(false);
    setNumber(Math.floor(Math.random() * 10) + 1);
    setNumberOfTries(0);
    setHintText("");
    setTriedNumbers([]);
    setInputText("");
  };

  const handleButtonPress = () => {
    setNumberOfTries((prevState) => {
      return prevState + 1;
    });

    if(number == inputText) {
      setNumberIsGuessed(true);
    } else {
      if (number > parseInt(inputText)) {
        setHintText("Hledané číslo je větší");
      } else {
        setHintText("Hledané číslo je menší");
      }

      setTriedNumbers((prevState) => {
        return [...prevState, inputText];
      });

      setIsTextAnimated(true);
      setTimeout(() => {
        setIsTextAnimated(false);
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      {numberIsGuessed ? (

        <View style={styles.wrap}>
          <Pressable onPress={restartGame} style={styles.button}>
            <Text style={{color: "white", fontSize: 16}}>
              Restart hry
            </Text>
          </Pressable>

          <View style={styles.wrapWin}>
            <Text style={styles.textWin}>Blahopřeji!</Text>
            <Text style={styles.textWin}>Číslo bylo {number}.</Text>
            <Text style={styles.textWin}>Uhodl jsi ho na {numberOfTries}. pokus.</Text>
          </View>
        </View>

      ) : (

        <View style={styles.wrap}>
          <Text style={styles.header}>
            Myslím si číslo mezi 1 - 10
          </Text>

          <View style={styles.rowWrap}>
            <TextInput 
              style={styles.input}
              onChangeText={(text) => {
                setInputText(text);
              }}
            />
            <Pressable onPress={handleButtonPress} style={styles.button}>
              <Text style={{color: "white", fontSize: 16}}>
                Zkus
              </Text>
            </Pressable>
          </View>

          <Text>Počet pokusů: {numberOfTries}</Text>
          <Text>Vyzkoušená čísla: {triedNumbers.join(", ")}</Text>

          <Animatable.View animation={isTextAnimated ? "shake" : ""} style={styles.animatedTextContainer}>
              <View
                style={{
                  backgroundColor: hintText === "" ? "white" : "#FF8D8D",
                  width: 250,
                  height: 30,
                  borderRadius: 6,
                  justifyContent: "center"
                }}
              >
                <Text style={styles.animatedText}>{hintText}</Text>
              </View>
          </Animatable.View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#317FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrap: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "75%",
    height: "55%",
    alignItems: "center",
    justifyContent: "center"
  },
  rowWrap: {
    flexDirection: "row",
    marginTop: 40,
    marginBottom: 30,
  },
  button: {
    borderRadius: 6,
    backgroundColor: "#317FFF",
    width: 90,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15
  },
  animatedTextContainer: {
    marginTop: 45
  },
  animatedText: {
    fontSize: 16,
    textAlign: "center"
  },
  input: {
    borderRadius: 6,
    borderColor: "#317FFF",
    borderWidth: 3,
    width: 70,
    height: 50,
    fontSize: 16,
    textAlign: "center"
  },
  header: {
    fontSize: 20,
    fontWeight: "bold"
  },
  wrapWin: {
    borderRadius: 10,
    backgroundColor: "#B9FFB0",
    padding: 18,
    marginTop: 18,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  textWin: {
    color: "#15B800",
    fontSize: 18
  }
});
