import { Provider } from "react-redux";
import { Menu } from "./Menu/Menu";
import {store} from "./state/store"

function App(){
  
  return(<>
    <Provider store={store}>
      <Menu/>
      </Provider>
      </>
  );
}

export default App;