const ProgressBar = ({ total, current }) => {
  return (
    <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`flex-1 ${
            index + 1 < current
              ? "bg-primary"
              : index + 1 === current
                ? "bg-primary/30"
                : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressBar;
