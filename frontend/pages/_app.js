import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";

import PageChange from "components/PageChange/PageChange.js";

import "assets/css/nextjs-material-dashboard.css?v=1.1.0";
import "styles/global.css"
import {redirect} from "next/dist/next-server/server/api-utils";

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

  static redirectUser(ctx, location) {
    if (ctx.req) {
      ctx.res.WriteHead(302, { Location: location});
      ctx.res.end();
    } else {
      Router.push(location);
    }
  }
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    let jwt = true

    if(!jwt) {
      if (ctx.pathname !== "/login") {
        this.redirectUser(ctx, "/login")
      }
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
