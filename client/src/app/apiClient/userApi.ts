import { UserType } from "../types/user";

export const userApi = {
  register: async (user: UserType) => {
    console.log(`===================================`);
    console.log(`TEST SIGNIN`);
    try {
      const res = await fetch(`http://localhost:3020/api/auth/signin`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          "email": user.email,
          "username": user.username,
          "password": user.password,
          "language": user.language,
          "targetLanguage": user.targetLanguage,
        })
      });
      const json = await res.json();
      console.log('===================================');
      console.log(json);
      return {success: true, message: json};
    }
    catch (error) {
      console.log(error);
      return {success: false, message: error.message}
    }
  },
  auth: async (email: string, password: string) => {
    console.log(`===================================`);
    console.log(`TEST LOGIN`);
    try {
      const res = await fetch(`http://localhost:3020/api/auth/login`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          "username": email,
          "password": password
        })
      });
      const json = await res.json();
      console.log('===================================');
      console.log(json);
      return {success: true, message: json};
    }
    catch (error) {
      console.log(error);
      return {success: false, message: error.message}
    }
  },
  update: async (user: UserType) => {
    console.log('------------------------------------------');
    console.log('Update User');
    const {userboard, token, name, email, username, language, targetLanguage, levels} = user;
    const userUpdates = {
      username, language, targetLanguage, email, userboard, name, levels
    }
    console.log(userUpdates);

    try {
      const res = await fetch(`http://localhoset:3020/api/users/${username}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify(userUpdates),
      });
      const json = await res.json();
      console.log('------------------------------------------');
      console.log(json);
      return {success: true, message: json};
    } catch (error) {
        console.log(error);
        return {success: false, message: error.message}
    }
  },
  greet: async () => {
    console.log(`===================================`);
    console.log(`TEST GREET`);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwMTVkMDI3YmEwYjc1MDAxZTkyZWFkMCIsInVzZXJuYW1lIjoiVVNFUjEiLCJwYXNzd29yZCI6IiQyYiQxMCRScWxhTE9wWHl6RUFsaWNsVUhpeHpPZjRQdWlYNzdSSDA3SkNZS2lCdG1ub0lNQWdBWFY5YSIsIm5hbWUiOiJ1c2VyMSIsImVtYWlsIjoiYUBhLmZyIiwiY3JlYXRlQXQiOiIyMDIxLTAxLTMwVDIxOjMxOjE5Ljk1NVoiLCJfX3YiOjB9LCJpYXQiOjE2MTMyNDc3NzgsImV4cCI6MTYxMzI1NDk3OH0.e1CZLhH4h4WnlpAKkvI7YaRyekHPMOUou92FMf0w7q4";
    try {
      const res = await fetch(`http://localhost:3020/api/auth/greet`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "GET"
      });
      const json = await res.json();
      return {success: true, message: json};
    }
    catch (error) {
      console.log(error);
      return {success: false, message: error.message}
    }
  }
}