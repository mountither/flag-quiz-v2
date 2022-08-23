import { FaLongArrowAltLeft } from "react-icons/fa";

const MenuLink = () => {
  return (
    <div>
      <a href="/" className="flex flex-col items-center">
        <FaLongArrowAltLeft className="text-white h-8 sm:h-10" size={30} />
        <p className="text-sm text-gray-300 font-bold mt-2">Menu</p>
      </a>
    </div>
  );
};

export default MenuLink;
