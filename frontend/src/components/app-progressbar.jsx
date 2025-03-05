import PropTypes from "prop-types";

const ProgressBar = ({ total, current }) => {
  return (
    <div className="flex w-full h-3 bg-gray-200 overflow-hidden">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`flex-1 ${
            index + 1 < current
              ? "bg-primary"
              : index + 1 === current
                ? "bg-primary/40"
                : "bg-gray-300 dark:bg-neutral-700"
          }`}
        />
      ))}
    </div>
  );
};

ProgressBar.propTypes = {
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
};

export default ProgressBar;
