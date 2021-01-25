import "../styles/global.scss";
import { ProvideAuth } from "../util/auth";

export default function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <Component {...pageProps} />
    </ProvideAuth>
  );
}
