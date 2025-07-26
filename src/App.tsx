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
  const [loading, setLoading] = useState(false);

  const [r, setR] = useState<number>(0);
  const [g, setG] = useState<number>(0);
  const [b, setB] = useState<number>(0);
  const [posR, setPosR] = useState<number>(0);
  const [posG, setPosG] = useState<number>(0);
  const [posB, setPosB] = useState<number>(0);


  const [modifiedImage, setModifiedImage] = useState<string>("");

    // Função para enviar dados ao back-end Flask
    const sendImageToBackend = async () => {
      if (!image) return;
      setLoading(true);
  
      // Montando o FormData
      const formData = new FormData();
      formData.append("image", image);
      formData.append("r", r.toString());
      formData.append("g", g.toString());
      formData.append("b", b.toString());
      formData.append("posR", posR.toString());
      formData.append("posG", posG.toString());
      formData.append("posB", posB.toString());
  
      try {
        const response = await fetch("https://colorimg.onrender.com/api/change-color", {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) {
          console.error("Erro ao processar a imagem no backend");
          return;
        }
  
        // Vamos receber a imagem como blob
        const blob = await response.blob();
        // Criar uma URL de objeto local para exibir a imagem
        const blobUrl = URL.createObjectURL(blob);
  
        // Guardar no state
        setModifiedImage(blobUrl);

        setLoading(false);
  
        // Seta o result para true para renderizar o <Result />
        setResult(true);
        
      } catch (error) {
        console.error("Erro ao enviar a imagem ao backend:", error);
      }
    };

  const createURL = (image: File) => {
    imageUrl = URL.createObjectURL(image);
  };

  const setAllColors = () => {
    if(color == ""){
      setError(true);
    } else{
      setError(false);
      sendImageToBackend();
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
              setR={setR}
              setG={setG}
              setB={setB}
              setPosR={setPosR}
              setPosG={setPosG}
              setPosB={setPosB}
              setAllColors={setAllColors}
              error={error}
              loading={loading}
            />
          )}
          {result &&
            <Result modifiedImage={modifiedImage}/>
          }
        </>
      )}
    </>
  );
}

export default App; 