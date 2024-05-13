import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import { useSignInMutation } from "../services/authService";
import { setUser } from "../features/User/userSlice";
import { useDispatch } from "react-redux";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [triggerSignIn, result] = useSignInMutation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  useEffect(() => {
    if (result.isSuccess) {
      console.log("🕵🏻 ~ useEffect ~ result:", result);
      dispatch(
        setUser({
          email: result.data.email,
          idToken: result.data.idToken,
        })
      );
    }
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
    backgroundColor: "#9b7794",
    gap: 15,
    paddingVertical: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: "Josefin",
  },
  sub: {
    fontSize: 14,
    color: "black",
  },
  subLink: {
    fontSize: 14,
    color: "blue",
  },
});
