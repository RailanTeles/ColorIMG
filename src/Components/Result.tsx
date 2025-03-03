import React from "react";

interface ResultProps {
  modifiedImage: string;
}

const Result: React.FC<ResultProps> = ({ modifiedImage }) => {
  return (
    <div className="flex flex-col items-center justify-center py-1 w-full">
      <h1 className="text-2xl font-medium mb-4 py-2">Imagem Alterada:</h1>
      {modifiedImage && (
        <div className="flex w-full flex-col md:flex-row justify-evenly items-center gap-8">
            <img
            src={modifiedImage}
            alt="Imagem modificada"
            className="w-full h-auto cursor-pointer md:w-2/5 md:max-w-[500px] max-w-[90%]"
          />
          <a href={modifiedImage} download="imagem_modificada.png">
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
              Baixar Imagem
            </button>
          </a>
        </div>
      )}
    </div>
  );
};

export default Result;