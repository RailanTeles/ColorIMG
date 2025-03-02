import React, { useRef, useEffect } from "react";

interface ImageProps {
  imageURL: string;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  posColor: string;
  setPosColor: React.Dispatch<React.SetStateAction<string>>;
  setR: React.Dispatch<React.SetStateAction<number>>;
  setG: React.Dispatch<React.SetStateAction<number>>;
  setB: React.Dispatch<React.SetStateAction<number>>;
  setPosR: React.Dispatch<React.SetStateAction<number>>;
  setPosG: React.Dispatch<React.SetStateAction<number>>;
  setPosB: React.Dispatch<React.SetStateAction<number>>;
  setAllColors: () => void;
  error: boolean;
}

const Image: React.FC<ImageProps> = ({
  imageURL,
  color,
  setColor,
  posColor,
  setPosColor,
  setR,
  setG,
  setB,
  setPosR,
  setPosG,
  setPosB,
  setAllColors,
  error,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const hexToRgba = (hex: string): string => {
    // Remover o '#' se existir
    if (hex.startsWith("#")) {
      hex = hex.slice(1);
    }

    // Converter o valor hex para RGB
    var thisR = parseInt(hex.substring(0, 2), 16);
    var thisG = parseInt(hex.substring(2, 4), 16);
    var thisB = parseInt(hex.substring(4, 6), 16);
    setPosR(thisR);
    setPosG(thisG);
    setPosB(thisB);

    // Retorna o formato rgba, com a opacidade (A) sendo 255
    return `rgba(${thisR}, ${thisG}, ${thisB}, 1)`; // 1 significa 100% opacidade
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let cl = hexToRgba(e.target.value);
    setPosColor(cl);
  };

  // Quando a imagem carregar, desenha-a no canvas oculto
  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
    };
  }, [imageURL]);

  const handleImageClick = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Obter a posição do clique relativa à imagem exibida
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Converter para as coordenadas do canvas (usando as dimensões naturais da imagem)
    const scaleX = canvas.width / e.currentTarget.clientWidth;
    const scaleY = canvas.height / e.currentTarget.clientHeight;
    const x = Math.floor(clickX * scaleX);
    const y = Math.floor(clickY * scaleY);

    try {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      // Converte a tupla [R, G, B, A] para uma string rgba
      const colorStr = `${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${
        pixel[3] / 255
      }`;
      setR(pixel[0]);
      setG(pixel[1]);
      setB(pixel[2]);
      setColor(colorStr);
      console.log(color);
    } catch (err) {}
  };

  const rgbToHex = (rgb: string) => {
    const result = rgb.match(/\d+/g);
    if (!result) return "#000000";
    const [r, g, b] = result.map(Number);
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  };

  return (
    <div className="flex w-full justify-evenly items-center py-14 md:flex-row flex-col md:gap-0 gap-14">
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <div className="md:w-2/5 md:max-w-[500px] max-w-[90%]">
        <img
          ref={imgRef}
          src={imageURL}
          alt="Selecionada"
          className="w-full h-auto cursor-pointer"
          onClick={handleImageClick}
        />
      </div>

      <div className="flex md:w-2/5 items-center flex-col md:gap-10 gap-5 max-w-[90%]">
        <div className="flex flex-col w-full items-center">
          <h1 className="font-medium text-2xl tracking-wide xl:text-3xl text-center">
            Cor substituída (Clique na imagem):
          </h1>
          <div className="flex gap-1 sm:flex-row flex-col items-center">
            <p>Cor selecionada: ({color})</p>
            <input type="color" value={rgbToHex(color)} disabled />
          </div>
        </div>

        <div className="flex flex-col w-full items-center">
          <h1 className="font-medium text-2xl tracking-wide xl:text-3xl text-center">
            Cor substituta:
          </h1>
          <div className="flex gap-1 sm:flex-row flex-col items-center">
            <p>Cor selecionada: {posColor} </p>
            <input
              type="color"
              name="color"
              id=""
              onChange={handleColorChange}
            />
          </div>
        </div>

        <input
          type="button"
          value="Gerar Imagem"
          className="bg-green-600 font-medium text-white sm:w-[50%] w-[80%] py-2 rounded-md cursor-pointer hover:scale-110 hover:bg-green-800 hover:text-stone-800 transition-transform-colors duration-300"
          onClick={setAllColors}
        />
        {error && (
          <p className="font-medium text-2xl text-red-600">
            Selecione a cor a ser substituída
          </p>
        )}
      </div>
    </div>
  );
};

export default Image;
