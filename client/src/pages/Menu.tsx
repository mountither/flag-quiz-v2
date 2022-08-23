import AnimatedPage from "../layouts/AnimatedPage";

const Menu = () => {
  return (
    <AnimatedPage>
      <div className="flex flex-col h-screen item-center">
        <div className="m-auto px-5">
          <h1 className="text-center font-extrabold text-transparent text-5xl sm:text-6xl bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400 pb-10">
            Welcome to the World Flag Game!
          </h1>

          <div className="text-center mt-5">
            <a
              href="single"
              type="button"
              className="bg-white px-5 rounded-2xl py-3 hover:opacity-70 duration-300 ease-in-out"
            >
              <p className="text-black text-2xl">Single Player</p>
            </a>
          </div>

          <div className="text-center mt-10">
            <a
              href="multi"
              type="button"
              className="bg-white px-5 rounded-2xl py-3 hover:opacity-70 duration-300 ease-in-out"
            >
              <p className="text-black text-2xl">Play with a friend</p>
            </a>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Menu;
