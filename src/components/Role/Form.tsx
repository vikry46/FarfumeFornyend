import { useState, useEffect } from 'react';
import axios from '../../utils/axiosInstance';

type Role = {
  id: number;
  nama: string;
};

export default function RoleForm() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [nama, setName] = useState('');

  useEffect(() => {
    axios.get('/roles').then(res => setRoles(res.data));
  }, []);

  const createRole = async () => {
    await axios.post('/role/store', { name });
    setName('');
    const res = await axios.get('/roles');
    setRoles(res.data);
  };

  return (
    <div>
      <h3>Role List</h3>
      <ul>{roles.map(r => <li key={r.id}>{r.nama}</li>)}</ul>
      <input
        value={nama}
        onChange={e => setName(e.target.value)}
        placeholder="Role name"
      />
      <button onClick={createRole}>Create Role</button>
    </div>
  );
}
