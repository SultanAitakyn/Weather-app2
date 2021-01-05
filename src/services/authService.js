import { BehaviorSubject } from "rxjs";

const currentSession = JSON.parse(localStorage.getItem("currentSession"));
const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentSession"))
);

export const authenticationService = {
  login,
  logout,
  isAuth,
  currentUser: currentUserSubject.asObservable(),
  get currentSessionValue() {
    return currentSession;
  },
};

function login(username, password) {
  let users = JSON.parse(localStorage.getItem(`users`));
  let error = { error: "No such user or incorrect password", isAuth: false };
  if (users) {
    let user = users.find((v) => v.login === username);
    if (user && user.password === password) {
      localStorage.setItem("currentSession", JSON.stringify(user));
      return { user: user, isAuth: true };
    } else {
      return error;
    }
  } else {
    return error;
  }
}

function logout() {
  localStorage.removeItem("currentSession");
}

function isAuth() {
  return currentSession && true;
}
