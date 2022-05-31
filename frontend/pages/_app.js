import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";

import PageChange from "components/PageChange/PageChange.js";

import "assets/css/nextjs-material-dashboard.css?v=1.1.0";
import "styles/global.css"
import "styles/input.css"
import {redirect} from "next/dist/next-server/server/api-utils";
import {parseCookies} from "nookies";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

export default class MyApp extends App {
  componentDidMount() {
    let comment = document.createComment(`

`);
    document.insertBefore(comment, document.documentElement);
  }

  static redirectUser(ctx, response, request, location) {
    if (request) {
      response.writeHead(301, {
        Location: location
      });
      response.end();
    }
    
    return {};
  }
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    const cookies = parseCookies(ctx)
    console.log("cookies : ", cookies, "\nRoute : ", router.pathname)
    if(cookies.jwt_ecuries === undefined && router.pathname !== "/login") {
        this.redirectUser(ctx, ctx.res, ctx.req, "/login")
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>Ecurie de Persévère | Gestion</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </React.Fragment>
    );
  }
}
