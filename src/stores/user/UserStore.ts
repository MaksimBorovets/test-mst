import { types, Instance, flow } from 'mobx-state-tree';

import UserModel from './UserModel';
import { IUser } from '../../common/types';

const UserStore = types
  .model({
    users: types.array(UserModel),
  })
  .actions((self) => ({
    addUser(name: string) {
      const id = self.users.length + 1;
      self.users.push({ id, name });
    },
    removeUser(id: number) {
      self.users.replace(self.users.filter((user) => user.id !== id));
    },

    fetchUsers: flow(function* fetchUsers() {
      try {
        const response = yield fetch(
          'https://jsonplaceholder.typicode.com/users',
        );
        const users: IUser[] = yield response.json();

        self.users.clear();

        users.forEach((user) => {
          self.users.push({
            id: user.id,
            name: user.name,
            isBlocked: false,
          });
        });
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    }),
  }));

export default UserStore;
export interface IUserStore extends Instance<typeof UserStore> {}
