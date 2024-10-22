import { Link } from "react-router-dom";
import "./styles.css";

export function NoRivalsGuide() {
  return (
    <section className="noRivalsGuide">
      <p className="noRivalsGuide__message">
        You don't have any rivals to choose, go to Profile to create one, and then, you can create a
        new fight registry ^^
      </p>
      <Link className="link" to="/profile">
        <span>Go to Profile</span>
      </Link>
    </section>
  );
}
