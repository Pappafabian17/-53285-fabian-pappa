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

  /* con el useEffect de aca abajo funciona bien pero no tiene la funcion insertSession */
  /*  useEffect(() => {
    if (result.isSuccess) {
      console.log("🕵🏻 ~ useEffect ~ result:", result);
      dispatch(
        setUser({
          email: result.data.email,
          idToken: result.data.idToken,
          localId: result.data.localId,
        })
      );
    }
  }, [result]); */

  useEffect(() => {
    if (result?.data && result.isSuccess) {
      dispatch(
        setUser({
          email: result.data.email,
          idToken: result.data.idToken,
          localId: result.data.localId,
        })
      );
      insertSession({
        email: result.data.email,
        localId: result.data.localId,
        idToken: result.data.idToken,
      })
        .then((response) => {
          console.log("response", response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [result]);

  /* useEffect(() => {
    (async () => {
      if (result?.data && result.isSuccess) {
        console.log("DATAAAAAAAAAAAAAAAAA", result.data);
        try {
          const res = await insertSession({
            email: result.data.email,
            localId: result.data.localId,
            token: result.data.idToken,
          });
          console.log("res!!!!!", res);
          dispatch(
            setUser({
              email: result.data.email,
              idToken: result.data.idToken,
              localId: result.data.localId,
            })
          );
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [result]); */

  const onSubmit = async () => {
    try {
      setError(""); // Limpiamos el error antes de intentar iniciar sesión

      if (!email || !password) {
        setError("Email and password are required");
      } else {
        console.log("email en else", email);
        console.log("password en else", password);
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
