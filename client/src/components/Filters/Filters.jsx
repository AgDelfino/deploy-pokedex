import React from "react";
import { useSelector } from "react-redux";
import styles from "./Filters.module.css";

const Filters = ({ filters, setFilters, paginator }) => {
  const types = useSelector((state) => state.types);

  const apiOrDbHandler = (e) => {
    const filter = e.target.id;
    if (filters.filterApiOrDb === filter) {
      return setFilters((state) => {
        return {
          ...state,
          filterApiOrDb: "",
        };
      });
    }
    setFilters((state) => {
      return {
        ...state,
        filterApiOrDb: filter,
      };
    });
    paginator(1);
  };

  const sortHandler = (e) => {
    const sort = e.target.id;

    if (filters.sortFilter === sort) {
      return setFilters((state) => {
        return {
          ...state,
          sortFilter: "",
        };
      });
    }
    setFilters((state) => {
      return {
        ...state,
        sortFilter: sort,
      };
    });
  };

  const typeHandler = (e) => {
    const type = e.target.id;
    const arrTypes = ["", ""];
    paginator(1);

    if (filters.typeFilter.find((f) => f === type)) {
      return setFilters((state) => ({
        ...state,
        typeFilter: state.typeFilter.filter((t) => t !== type).concat(""),
      }));
    }

    if (filters.typeFilter[0] && filters.typeFilter[1]) {
      return;
    }
    if (!filters.typeFilter[0] && !filters.typeFilter[1]) {
      setFilters((state) => ({ ...state, typeFilter: [type, ""] }));
    }
    if (filters.typeFilter[0] && !filters.typeFilter[1]) {
      arrTypes[0] = filters.typeFilter[0];
      arrTypes[1] = type;
      setFilters((state) => ({ ...state, typeFilter: arrTypes }));
    }
    if (!filters.typeFilter[0] && filters.typeFilter[1]) {
      arrTypes[0] = type;
      arrTypes[1] = filters.typeFilter[1];
      setFilters((state) => ({ ...state, typeFilter: arrTypes }));
    }
  };

  const exitHandler = () => {
    setFilters((state) => ({ ...state, active: false }))
  }

  return (
    <div
      className={`${styles.main_container} ${
        filters.active ? styles.activeFilters : null
      }`}
    >
      <button onClick={exitHandler} className={styles.exit_button}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className={styles.filters_container}>
        <h3 className={styles.title_type}>Filter by Type</h3>
        {types.map((type, index) => {
          return (
            <button
              key={index}
              id={type.name}
              className={`${styles[type.name]} ${styles.type_buttons} ${
                filters.typeFilter.find((f) => f === type.name)
                  ? styles.active_type
                  : null
              }`}
              onClick={typeHandler}
            />
          );
        })}
      </div>
      <h3 className={styles.title_type}>Order by </h3>
      <div className={styles.sort_buttons_container}>
        <button className="filter_buttons" id="A-Z" onClick={sortHandler}>
          A-Z
        </button>
        <button className="filter_buttons" id="Z-A" onClick={sortHandler}>
          Z-A
        </button>
        <button className="filter_buttons" id="ATK-" onClick={sortHandler}>
          {`>ATK`}
        </button>
        <button className="filter_buttons" id="ATK+" onClick={sortHandler}>
          {`<ATK`}
        </button>
      </div>
      <h3 className={styles.title_type}>Select by </h3>
      <div className={styles.db_api_buttons_container}>
        <button id="DB" className="filter_buttons" onClick={apiOrDbHandler}>
          D B
        </button>
        <button id="API" onClick={apiOrDbHandler} className="filter_buttons">
          API
        </button>
        <button id="ALL" onClick={apiOrDbHandler} className="filter_buttons">
          ALL
        </button>
      </div>
    </div>
  );
};

export default Filters;
