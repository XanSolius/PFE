import { useNavigate } from "react-router-dom";

const PageTwo = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Page Two</h1>
      <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
};

export default PageTwo;
