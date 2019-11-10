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
          <CategoriesPills filteredCategories={filteredCategories} />
          <CategoriesMultiselect
            open={open}
            data={categories}
            toggler={this.toggleVisibility}
            handler={handleFilterChange}
          />
        </div>
      </nav>
    );
  }
}

function CategoriesPills({ filteredCategories }) {
  return (
    <div className="Bar-input">
      <ul className="Pills">
        {filteredCategories.map(filter => (
          <li className="Movie-category Pills-items" key={filter}>
            {filter}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CategoriesMultiselect({ handler, open, data, toggler }) {
  return (
    <div className="Bar-multiselect">
      <div className="Bar-multiselect__slot">
        <CategoriesBoxHeader toggleVisibility={toggler} />
        <CategoriesBox
          open={open}
          categories={data}
          handleFilterChange={handler}
        />
      </div>
    </div>
  );
}

function CategoriesBox({ open, categories, handleFilterChange }) {
  return (
    open && (
      <div className="Bar-multiselect__box">
        <ul className="Bar-multiselect__list">
          {categories.map((category, idx) => (
            <li className="Bar-multiselect__element" key={idx}>
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
    )
  );
}

function CategoriesBoxHeader({ toggleVisibility }) {
  return (
    <div onClick={toggleVisibility} className="Bar-multiselect__header">
      CATEGORIES
      <i className="fas fa-angle-down"></i>
    </div>
  );
}
