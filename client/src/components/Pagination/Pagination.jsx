import styles from "./Pagination.module.css";

const Pagination = ({ pokemons, pokemonsByPage, paginator, page }) => {

  const handleArrowNavigation = (event) => {
    if (event.key === 'ArrowLeft') prevHandler();
    if (event.key === 'ArrowRight') nextHandler();
  };
document.onkeyup = handleArrowNavigation;

  let pages = [];
  for (let i = 0; i < Math.ceil(pokemons / pokemonsByPage); i++) {
    pages.push(i + 1);
  }

  const nextHandler = () => {
    if (page < Math.ceil(pokemons / pokemonsByPage)) {
      paginator(page + 1);
    }
  };

  const prevHandler = () => {
    if (page > 1) {
      paginator(page - 1);
    }
  };

  return (
    <div className={styles.pagination_container}>
      <ul className={styles.pages}>
        {pages.length ? (
          <>
            <button
              className={styles.prev_container}
              onClick={() => prevHandler() }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.prev}
                width="36"
                height="36"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 15v3.586a1 1 0 0 1 -1.707 .707l-6.586 -6.586a1 1 0 0 1 0 -1.414l6.586 -6.586a1 1 0 0 1 1.707 .707v3.586h3v6h-3z"></path>
                <path d="M21 15v-6"></path>
                <path d="M18 15v-6"></path>
              </svg>
            </button>
            {pages.map((p) => {
              return (
                <li key={p}>
                  <div
                    className={styles.pag_button}
                    onClick={() => {
                      paginator(p);
                    }}
                  >
                    <div className={page === p ? `${styles.active_top}` : `${styles.poketop}`}></div>
                    {p}
                    <div className={page === p ? `${styles.active_bot}` : `${styles.pokebot}`}></div>
                  </div>
                </li>
              );
            })}
            <button
              className={styles.next_container}
              onClick={() => nextHandler()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.next}
                width="36"
                height="36"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 9v-3.586a1 1 0 0 1 1.707 -.707l6.586 6.586a1 1 0 0 1 0 1.414l-6.586 6.586a1 1 0 0 1 -1.707 -.707v-3.586h-3v-6h3z"></path>
                <path d="M3 9v6"></path>
                <path d="M6 9v6"></path>
              </svg>
            </button>
          </>
        ) : null}
      </ul>
    </div>
  );
};

export default Pagination;
