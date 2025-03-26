import Chat from './components/Chat';
import Layout from './components/Layout';

interface IUser {
  uid: string,
  email: string | null,
  photoURL: string | null
}

export interface IMessage {
  user: IUser, 
  message: string, 
  id: number, 
  event: string
}

function App() {
  return (
    <Layout>
      <Chat/>
    </Layout>
  );
}

export default App;