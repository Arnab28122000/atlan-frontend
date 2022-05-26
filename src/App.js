import Home from "./components/home";

import {RootState} from './context/root';

function App() {
  return (
    <RootState>
      <Home/>
   </RootState>
  );
}

export default App;
