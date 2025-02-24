const Home = ({
  setImage,
}: {
  setImage: (image: File | null) => void;
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);
  };

  return (
    <div className="flex flex-col items-center justify-center p-0 gap-9 sm:p-24">
      <h1 className="font-medium text-2xl tracking-wide xl:text-3xl">Selecione um arquivo</h1>
      <input
        type="file"
        id="file-upload"
        onChange={handleFileChange}
        className="opacity-0 absolute"
        accept="image/jpeg, image/png, image/jpg"
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer text-blue-500 border-2 border-black p-20 sm:p-40 rounded-lg"
      >
        Clique aqui!
      </label>
    </div>
  );
};

export default Home;
