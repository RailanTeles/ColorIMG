import { useState } from "react";
import "./App.css";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Image from "./Components/Image";

function App() {
  const [image, setImage] = useState<File | null>(null);
  let imageUrl: string = "";

  const createURL = (image: File) => {
    imageUrl = URL.createObjectURL(image);
  };

  return (
    <>
      <NavBar />
      {!image ? (
        <Home setImage={setImage} />
      ) : (
        <>
        {createURL(image)}
        {imageUrl &&
          <Image imageURL={imageUrl}/>
        }
        </>
      )}
    </>
  );
}

export default App;