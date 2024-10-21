import { BOOK_INTERVIEW, INTERVIEW_FEATURES } from "../../utilities/constants";
import { HeaderCardTwo } from "../common/HeaderCard/header-card-two";
import { Seperator } from "../ui/Seperator";
import { FeatureCard } from "./Features";
export const BookInterview = () => {
  return (
    <div className="book-interview">
      <div className="custom-container">
        <div className="book-interview-grid">
          <HeaderCardTwo {...BOOK_INTERVIEW} />
          <Seperator />

          <div className="feature_cards">
            {INTERVIEW_FEATURES.map((item, idx) => (
              <FeatureCard {...item} key={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
