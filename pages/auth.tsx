import Input from "@/components/Input";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full bg-[url('/images/hero.png')] bg-no-repeat bg-bottom bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-30">
        <h1 className="text-[#C1FF72] lg:hidden text-center pt-6 text-6xl font-bold">
          WEBFLIX
        </h1>
        <div className="flex justify-center py-48">
          <div className="lg:bg-[#2F4858] lg:bg-opacity-90 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 text-center font-semibold">
              {variant === "register" ? "S'inscrire" : "Se Connecter"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Nom d'utilisateur"
                  onChange={(e: any) => {
                    setName(e.target.value);
                  }}
                  id="username"
                  value={name}
                />
              )}
              <Input
                label="Email"
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Mot de passe"
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="hover:bg-[#C1FF72] py-3 text-[#2F4858] rounded-md w-full mt-10 bg-[#66E08C] transition"
            >
              {variant === "register" ? "S'inscrire" : "Se Connecter"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="
                w-10 h-10  bg-white rounded-full flex items-center opacity-80 justify-center cursor-pointer hover:opacity-100 transition"
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/" })}
                className="
                w-10 h-10  bg-white rounded-full flex items-center justify-center opacity-80 cursor-pointer hover:opacity-100 transition"
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className="text-neutral-400 mt-12 text-center">
              {variant === "login" ? "Pas encore inscrit?" : "Déjà inscrit?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Créer un compte" : "Se connecter"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
