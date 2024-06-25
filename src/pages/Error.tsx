import { useRouteError } from "react-router-dom";
import Box from "../UI/Box";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Box>
      <h1>404 Ошибка!</h1>
      <p>Извините, произошла непредвиденная ошибка.</p>
      {/* <p>
        <i>{error.statusText || error.message}</i>
      </p> */}
    </Box>
  );
}
