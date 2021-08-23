import { UserDocument } from "./schemas/users.schema";
import { BlockDimensions, Blocks, Userboard } from "./types";
import { UpdateUserboardDTO } from "./userboard/dto/update-userboard.dto";

export function blocksToUserboard(blocks: Blocks) {
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

export function userboardToBlocks(userboard: UpdateUserboardDTO) {
  return Object.keys(userboard).map((key => {
      return (
          {
              name: key,
              lg: userboard[key].lg,
              md: userboard[key].md,
              sm: userboard[key].sm,
              xs: userboard[key].xs
          }
      )
  }));
};

export function formatUser(user: UserDocument) {
  return {
    role: user.role,
    username: user.username,
    name: user.name,
    password: user.password,
    language: user.language,
    targetLanguage: user.targetLanguage,
    levels: user.levels,
    userboard: user.userboard?.blocks ? blocksToUserboard(user.userboard.blocks): undefined,
    createAt: user.createAt,
  }
};