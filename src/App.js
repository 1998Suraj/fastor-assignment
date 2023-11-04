import EnterMobileNumber from "./Component/Login/EnterMobileNumber";
import EnterOTP from "./Component/Login/EnterOTP";
import Restaurant from './Component/Restraunt/Restraunt'
import { Routes, Route } from "react-router-dom";
import RestaurantDetails from "./Component/Restraunt/RestaurentDetals";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={`/`} element={<EnterMobileNumber />}></Route>
        <Route path={`/otp`} element={<EnterOTP />}></Route>
        <Route path={`/restaurant`} element={<Restaurant />}></Route>
        <Route path={`/restaurant/:id`} element={<RestaurantDetails />}></Route>
      </Routes>
    </div>
  );
}

export default App;
