type SpinnerProps = {
  styles?: string;
};

const Spinner = ({ styles }: SpinnerProps) => {
  return (
    <div
      className={`w-10 h-10 mx-auto animate-spin border-4 border-t-4 rounded-full border-t-[#fc77b7] ${styles}`}
    />
  );
};

export default Spinner;
