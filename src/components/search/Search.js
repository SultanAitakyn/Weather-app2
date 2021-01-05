import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Search(props) {
  return (
    <section className="section__search">
      <form className="form__search" onSubmit={(e) => props.getCityWeather(e)}>
        <div className="control">
          <input
            type="text"
            name="name"
            className="search__input"
            placeholder="Search city"
            onChange={(e) => props.setCity(e.target.value)}
          />
        </div>
        <button type="submit" className="search__button">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </section>
  );
}

export default Search;
