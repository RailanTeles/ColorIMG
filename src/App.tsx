import { useState } from "react";
import "./App.css";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Image from "./Components/Image";
import Result from "./Components/Result";

function App() {
  const [image, setImage] = useState<File | null>(null);
  var imageUrl: string = "";
  const [color, setColor] = useState<string>("");
  const [posColor, setPosColor] = useState<string>("");
  const [result, setResult] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [r, setR] = useState<number>(0);
  const [g, setG] = useState<number>(0);
  const [b, setB] = useState<number>(0);
  const [posR, setPosR] = useState<number>(0);
  const [posG, setPosG] = useState<number>(0);
  const [posB, setPosB] = useState<number>(0);

  const createURL = (image: File) => {
    imageUrl = URL.createObjectURL(image);
  };

  const setAllColors = () => {
    if(color == ""){
      setError(true);
    } else{
      setError(false);
      setResult(true);
    }
  }

  return (
    <>
      <NavBar />
      {!image ? (
        <Home setImage={setImage} />
      ) : (
        <>
          {createURL(image)}
          {imageUrl && (
            <Image
              imageURL={imageUrl}
              color={color}
              setColor={setColor}
              posColor={posColor}
              setPosColor={setPosColor}
              setR={setR} // Passa as funções de atualização do estado
              setG={setG}
              setB={setB}
              setPosR={setPosR}
              setPosG={setPosG}
              setPosB={setPosB}
              setAllColors={setAllColors}
              error={error}
            />
          )}
          {result &&
            <Result/>
          }
        </>
      )}
    </>
  );
}

export default App;
