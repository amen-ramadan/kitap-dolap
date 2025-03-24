import logo from "../../assets/image.png";

const Logo = ({ width = 390, height = 100 }) => {
  return (
    <div className="logo-container">
      <img src={logo} alt="Logo" width={width} height={height} />
    </div>
  );
};

export default Logo;
