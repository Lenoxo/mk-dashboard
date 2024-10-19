import { Link } from "react-router-dom";
import "./styles.css";

export function NewUserGuide() {
  return (
    <section className="newUserSection">
      <p className="newUserSection__message">
        It looks like it's your first time here, First, you need to create your
        profile data, Click the button to do it:
      </p>
      <Link className="link" to="/profile/update">
        <span>Go to create your profile</span>
      </Link>
    </section>
  );
}
