const Image = ({ imageURL }: { imageURL: string }) => {

  return (
    <div className="flex w-full justify-evenly items-center py-14">
      <div className="w-2/5 max-w-[400px]">
        <img src={imageURL} alt="Selecionada" className="w-full h-auto"/>
      </div>
      <div className="flex w-2/5 items-center justify-center">
        <p>Oi</p>
      </div>
    </div>
  );
};

export default Image;
