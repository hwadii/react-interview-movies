import React from "react";
import "./Pagination.css";

export default class Pagination extends React.Component {
  render() {
    const { handleElementsChange: handler } = this.props;
    return (
      <div className="Pagination">
        <Pages {...this.props} />
        <Selection handler={handler} />
      </div>
    );
  }
}

function Pages({ pages, currentPage, handlePageChange: handler }) {
  let i = 0;
  let pagesList = [
    <li key={i} onClick={() => handler(-1)} className="Page-element">
      «
    </li>
  ];
  for (i = 1; i <= pages; i++) {
    pagesList = [
      ...pagesList,
      <li
        className={
          currentPage === i ? "Page-element Page-active" : "Page-element"
        }
        key={i}
      >
        {i}
      </li>
    ];
  }
  pagesList = [
    ...pagesList,
    <li
      key={i + 1}
      onClick={() => handler(1)}
      className="Page-element"
    >
      »
    </li>
  ];
  return <ul className="Pages">{pagesList}</ul>;
}

function Selection({ handler }) {
  return (
    <select className="Selection" onChange={handler}>
      <option value="4">4</option>
      <option value="8">8</option>
      <option value="12">12</option>
    </select>
  );
}
