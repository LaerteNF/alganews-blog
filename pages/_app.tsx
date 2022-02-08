import "../styles/globals.css";
import type { AppProps as NextAppProps } from "next/app";
import Error from "next/error";
import { ThemeProvider } from "styled-components";
import { light } from "../styles/theme";
import GlobalStyles from "../styles/globalStyles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Content from "../components/Content";
import ProgressBar from "@badrap/bar-of-progress";
import { Router } from "next/router";
import "../httpConfig";

interface CustomAppProps extends NextPageProps {}

// Cria um type que é uma extensão do AppProps do next porém sobreescrevendo a propriedade pageProps
type AppProps<P = any> = {
  pageProps: P;
} & Omit<NextAppProps<P>, "pageProps">;

const progress = new ProgressBar({
  size: 2,
  color: light.primaryBackground,
  delay: 100,
});

function MyApp({ Component, pageProps }: AppProps<CustomAppProps>) {
  if (pageProps.error) {
    return (
      <Error
        statusCode={pageProps.error.statusCode}
        title={pageProps.error.message}
      />
    );
  }
  return (
    <ThemeProvider theme={light}>
      <Header />
      <Content>
        <Component {...pageProps} />
      </Content>
      <Footer />
      <GlobalStyles />
    </ThemeProvider>
  );
}

// dispara a barrinha de progresso
Router.events.on("routeChangeStart", progress.start);

// finaliza a barrinha quando muda de link ou dá erro
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

export default MyApp;
