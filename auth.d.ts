declare module '#auth-utils' {
  interface User {
    id: number;
    username: string;
  }

  interface UserSession {
    lastLoggedIn: Date;
  }

  interface SecureSessionData {

  }
}

export {}