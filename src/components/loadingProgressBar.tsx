export const LoadingProgressBar = ({
  progressPercentage,
}: {
  progressPercentage: number;
}) => {
  return (
    <>
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#e5e7eb"
          stroke-width="10"
        ></circle>
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#10b981"
          stroke-width="10"
          stroke-dasharray="251.2"
          stroke-dashoffset="0"
        ></circle>
        <text
          x="50"
          y="50"
          font-family="Arial"
          font-size="20px"
          fill="#10b981"
          text-anchor="middle"
          alignment-baseline="middle"
        >
          {progressPercentage}%
        </text>
      </svg>
    </>
  );
};
