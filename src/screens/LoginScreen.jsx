import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import { useSignInMutation } from "../services/authService";
import { setUser } from "../features/User/userSlice";
import { useDispatch } from "react-redux";
import { insertSession } from "../persistence";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [triggerSignIn, result] = useSignInMutation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      if (result?.data && result.isSuccess) {
        try {
          const res = await insertSession({
            email: result.data.email,
            localId: result.data.localId,
            token: result.data.idToken,
          });
          dispatch(
            setUser({
              email: result.data.email,
              idToken: result.data.idToken,
              localId: result.data.localId,
            })
          );
        } catch (err) {
          console.error(err);
        }
      }
    })();
  }, [result]);

  const onSubmit = async () => {
    try {
      setError(""); // Limpiamos el error antes de intentar iniciar sesión

      if (!email || !password) {
        setError("Email and password are required");
      } else {
        await triggerSignIn({ email, password });

        if (result.isError) {
          setError("Email or password incorrect");
        }
      }
    } catch (error) {
      setError("An error occurred while signing in");
      console.error("Error signing in:", error);
    }
  };
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>Login to start</Text>
        <InputForm label={"email"} onChange={setEmail} error={error} />
        <InputForm
          label={"password"}
          onChange={setPassword}
          error={error}
          isSecure={true}
        />
        <SubmitButton onPress={onSubmit} title="Send" />
        <Text style={styles.sub}>Not have an account?</Text>
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.subLink}>Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#b2b3f3",
    gap: 15,
    paddingVertical: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    fontFamily: "Josefin",
  },
  sub: {
    fontSize: 14,
    color: "black",
  },
  subLink: {
    fontSize: 14,
    fontWeight: "800",
    color: "blue",
  },
});
