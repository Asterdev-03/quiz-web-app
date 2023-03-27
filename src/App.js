import Login from "./components/login/Login";
import Register from "./components/register/Register";

// We use Route in order to define the different routes of our application
/* import { Route, Routes } from "react-router-dom"; */

const App = () => {
  /*  const [data, setData] = useState("");

  const getData = async () => {
    const response = await Axios.get("http://localhost:5000/getData");
    setData(response.data);
  };

  useEffect(() => {
    getData();
  }, []); */

  return (
    <div>
      {/* <h1>{data}</h1> */}

      <Login />
      <Register />
    </div>
  );
};

export default App;
