import { UserboardType, UserType } from "../types/user";

export const userApi = {
  register: async (user: UserType) => {
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
      return {success: true, message: json};
    }
    catch (error) {
      console.log(error);
      return {success: false, message: error.message}
    }
  },
  auth: async (email: string, password: string) => {
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
      console.log(json);
      if (json.statusCode === 200)
        return { success: true, message: json.user };
      return {success: false, message: json.message}
    }
    catch (error) {
      console.log(error);
      return {success: false, message: error.message}
    }
  },
  update: async (user: UserType) => {
    const {userboard, token, name, email, username, language, targetLanguage, levels} = user;
    const userUpdates = {
      username, language, targetLanguage, email, userboard, name, levels
    }

    try {
      const res = await fetch(`http://localhost:3020/api/users/${username}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify(userUpdates),
      });
      const json = await res.json();
      return {success: true, message: json};
    } catch (error) {
        console.log(error);
        return {success: false, message: error.message}
    }
  },
}