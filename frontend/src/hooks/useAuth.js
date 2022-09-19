import { useContext } from 'react';
import AuthContext from '../context/AuthContext/AuthContext.js';
import SocketContext from '../context/SocketContext/SocketContext.js';

export const useAuth = () => useContext(AuthContext);
export const useApi = () => useContext(SocketContext);
