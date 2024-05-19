import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function SelectLabels({ userList, userId, setUserId }) {
  const handleChange = (event) => {
    setUserId(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel id="demo-simple-select-small-label">User Filter</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={userId}
        label="User Id"
        onChange={handleChange}
      >
        {userList?.map((user) => (
          <MenuItem key={user._id} value={user._id}>{user.userFullName}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}