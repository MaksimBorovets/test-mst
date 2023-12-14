import { useEffect, useState } from 'react';
import './App.css';
import { observer, inject } from 'mobx-react';

import { IUserStore } from './stores/user/UserStore';
import UserListitem from './common/types/components/user-list-item/UserListitem';

interface IAppProps {
  userStore?: IUserStore;
}

const App = ({ userStore }: IAppProps) => {
  const [newUserName, setNewUserName] = useState('');

  useEffect(() => {
    userStore?.fetchUsers();
  }, [userStore]);

  const handleAddUser = () => {
    if (newUserName) {
      userStore?.addUser(newUserName);
      setNewUserName('');
    }
  };

  return (
    <div className="App">
      <input
        value={newUserName}
        onChange={(e) => setNewUserName(e.target.value)}
      />
      <button onClick={handleAddUser}>Add User</button>
      <ul>
        {userStore?.users.map((user) => (
          <UserListitem key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
};

export default inject('userStore')(observer(App));
