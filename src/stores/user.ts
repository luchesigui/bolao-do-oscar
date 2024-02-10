import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { defineStore } from "pinia";
import { router } from "../router";
import { auth } from "../service/firebase";

export type LoginData = {
  username: string;
  password: string;
};

type UserState = {
  user: User | null;
};

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    user: null,
  }),
  getters: {
    isSignedIn(state) {
      return state.user !== null;
    },
  },
  actions: {
    async register({ username, password }: LoginData) {
      const response = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      );

      if (response) {
        this.user = response.user;
        router.push("/");
      } else {
        throw new Error("Unable to register user");
      }
    },
    async logIn({ username, password }: LoginData) {
      const response = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );

      if (response) {
        this.user = response.user;
      } else {
        throw new Error("login failed");
      }
    },
    async signOut() {
      await signOut(auth);
      this.user = null;
      router.push("/login");
      localStorage.removeItem("user");
    },
    async getCurrentUser() {
      return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
          auth,
          (user) => {
            unsubscribe();
            this.user = user;
            resolve(user);
          },
          reject
        );
      });
    },
  },
});
