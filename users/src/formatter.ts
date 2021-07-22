import { UserDocument } from "./schemas/users.schema";
import { Blocks } from "./types";

export function formatUserboard(blocks: Blocks) {
  return blocks.reduce((obj, item) => {
    return {
      ...obj,
      [item.name]: {
        lg: item.lg, 
        md: item.md, 
        sm: item.sm, 
        xs: item.xs
      }
    };
  }, {});
}

export function formatUser(user: UserDocument) {
  return {
    role: user.role,
    username: user.username,
    name: user.name,
    password: user.password,
    language: user.language,
    targetLanguage: user.targetLanguage,
    levels: user.levels,
    userboard: user.userboard?.blocks ? formatUserboard(user.userboard.blocks): undefined,
    createAt: user.createAt,
  }
}