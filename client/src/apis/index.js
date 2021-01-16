  
import io from 'socket.io-client';

const port = "localhost:7789"; //need to change it before deployment
const socket = io(port);


export default socket;