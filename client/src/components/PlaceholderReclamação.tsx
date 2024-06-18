import Skeleton from "react-loading-skeleton";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function PlaceholderReclamação() {
  return (
    <div className="w-full border select-none border-gray-100 bg-blue-500 shadow-md p-5 rounded-lg duration-300">
      <Skeleton
        baseColor="rgb(96 165 250)"
        highlightColor="rgb(147 197 253)"
        count={1}
        width="40%"
        className="h-6 mb-2"
      />
      <Skeleton
        baseColor="rgb(96 165 250)"
        highlightColor="rgb(147 197 253)"
        count={2}
        width="50%"
      />
      <div className="float-right -translate-y-4 flex items-center">
        <Skeleton
          baseColor="rgb(96 165 250)"
          highlightColor="rgb(147 197 253)"
          width="15px"
          className="mr-1"
        />
        <FontAwesomeIcon icon={faHeart} color="white" size="lg" />
      </div>
    </div>
  );
}
