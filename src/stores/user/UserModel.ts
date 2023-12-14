import { types } from 'mobx-state-tree';

const UserModel = types
  .model({
    id: types.identifierNumber,
    name: types.string,
    isBlocked: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    editName(newName: string) {
      self.name = newName;
    },
    toggleBlock() {
      self.isBlocked = !self.isBlocked;
    },
  }));

export default UserModel;
