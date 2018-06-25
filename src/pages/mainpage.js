import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Header, Sidebar, Content, Footer } from "components/layout";

import componentQueries from "react-component-queries";

import MinMaxPage from "pages/minmaxpage.js";
import Article59 from "pages/article59.js";
import Products from "pages/products.js";



import "styles/reduction.css";


class Main extends React.Component {


  static isSidebarOpen() {
    return document
      .querySelector(".cr-sidebar")
      .classList.contains("cr-sidebar--open");
  }

  componentWillReceiveProps({ breakpoint }) {
    if (breakpoint !== this.props.breakpoint) {
      this.checkBreakpoint(breakpoint);
    }
  }

  componentDidMount() {
    this.checkBreakpoint(this.props.breakpoint);
  }

  // close sidebar when
  handleContentClick = event => {
    // close sidebar if sidebar is open and screen size is less than `md`
    if (
      Main.isSidebarOpen() &&
      (this.props.breakpoint === "xs" ||
        this.props.breakpoint === "sm" ||
        this.props.breakpoint === "md")
    ) {
      this.openSidebar("close");
    }
  };

  checkBreakpoint(breakpoint) {
    switch (breakpoint) {
      case "xs":
      case "sm":
      case "md":
        return this.openSidebar("close");

      case "lg":
      case "xl":
      default:
        return this.openSidebar("open");
    }
  }

  openSidebar(openOrClose) {
    if (openOrClose === "open") {
      return document
        .querySelector(".cr-sidebar")
        .classList.add("cr-sidebar--open");
    }

    document.querySelector(".cr-sidebar").classList.remove("cr-sidebar--open");
  }

  render() {
    return (
      <BrowserRouter basename="/">
        <main className="cr-app bg-dark">
          <Sidebar />
          <Content fluid onClick={this.handleContentClick}>
            <Header />
            <Switch>
              <Route exact path="/minmax" component={MinMaxPage} />
              <Route path="/article59" component={Article59} />
              <Route path="/products" component={Products} />


              <Redirect to="/" />
            </Switch>
            <Footer />
          </Content>
        </main>
      </BrowserRouter>
    );
  }
}


const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: "xs" };
  }

  if (576 < width && width < 767) {
    return { breakpoint: "sm" };
  }

  if (768 < width && width < 991) {
    return { breakpoint: "md" };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: "lg" };
  }

  if (width > 1200) {
    return { breakpoint: "xl" };
  }

  return { breakpoint: "xs" };
};

export default componentQueries(query)(Main);
