import { useState } from 'react';
import { Instance } from 'mobx-state-tree';
import { inject, observer } from 'mobx-react';

import { IUserStore } from '../../../../stores/user/UserStore';
import UserModel from '../../../../stores/user/UserModel';

import './UserListItem.css';

interface IUserListItemProps {
  user: Instance<typeof UserModel>;
  userStore?: IUserStore;
}

const UserListItem = ({ user, userStore }: IUserListItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(user.name);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempName(e.target.value);
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const saveName = () => {
    if (isEditing) {
      user.editName(tempName);
      setIsEditing(false);
    }
  };

  const toggleBlock = () => {
    user.toggleBlock();
  };

  const removeUser = () => {
    if (userStore && !user.isBlocked) {
      userStore.removeUser(user.id);
    }
  };

  return (
    <li className={`user-list-item ${isEditing ? 'editing' : ''}`}>
      {isEditing ? (
        <>
          <input value={tempName} onChange={handleInputChange} />
          <button onClick={saveName}>Save</button>
          <button onClick={cancelEditing}>Cancel</button>
        </>
      ) : (
        <>
          {user.name} -{' '}
          <span
            className={`user-status ${user.isBlocked ? 'blocked' : 'active'}`}>
            {user.isBlocked ? 'Blocked' : 'Active'}
          </span>
          <button disabled={user.isBlocked} onClick={startEditing}>
            Edit Name
          </button>
          <button onClick={toggleBlock}>
            {user.isBlocked ? 'Unblock' : 'Block'}
          </button>
          <button disabled={user.isBlocked} onClick={removeUser}>
            Remove
          </button>
        </>
      )}
    </li>
  );
};

export default inject('userStore')(observer(UserListItem));
