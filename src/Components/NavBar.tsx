import Logo from "../Images/Logo.svg";

const NavBar = () => {
  return (
    <div id="Navbar" className="bg-slate-300 flex p-6 items-center gap-10 w-full">
      <img src={Logo} alt="" className="xl:w-[80px] xl:h-[80px]"/>
      <h1 className="font-medium text-4xl tracking-wide xl:text-5xl">
        Color <span className="text-red">I</span>
        <span className="text-blue">M</span>
        <span className="text-yellow">G</span>ine
      </h1>
    </div>
  );
};

export default NavBar;
