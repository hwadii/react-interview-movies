import React from "react";
import "./Multiselect.css";

export default class Mutliselect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  toggleVisibility() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  render() {
    const { open } = this.state;
    const { categories, handleFilterChange, filteredCategories } = this.props;
    return (
      <nav className="Bar">
        <div className="Bar-content">
          <div className="Bar-input">
            <CategoryPills filteredCategories={filteredCategories} />
          </div>
          <div className="Bar-multiselect">
            <div className="Bar-multiselect__slot">
              <div
                onClick={this.toggleVisibility}
                className="Bar-multiselect__header"
              >
                CATEGORIES
                <i className="fas fa-angle-down"></i>
              </div>
              <div
                className={
                  open
                    ? "Bar-multiselect__box"
                    : "Bar-multiselect__box Bar-multiselect__boxHidden"
                }
              >
                <ul className="Bar-multiselect__list">
                  {categories.map(category => (
                    <li className="Bar-multiselect__element" key={category}>
                      <label className="Bar-multiselect__label">
                        <input
                          type="checkbox"
                          onClick={() => handleFilterChange(category)}
                        />
                        {category}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

function CategoryPills({ filteredCategories }) {
  console.log(filteredCategories);
  return (
    <ul className="Pills">
      {filteredCategories.map(filter => (
        <li className="Movie-category Pills-items" key={filter}>
          {filter}
        </li>
      ))}
    </ul>
  );
}
