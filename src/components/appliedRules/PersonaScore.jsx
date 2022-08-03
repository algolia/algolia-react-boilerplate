const PersonaScore = (props) => {
  const { resultsScore, personaName } = props;
  console.log(personaName);
  return (
    <div className="appliedRules__persona">
      <h3>{personaName}'s affinities</h3>
      <ul className="scoreList">
        <li className="scoreList__item">
          <p>HierarchicalCategories : Woman</p>
          <div className="scoreBar">
            <div className="scoreBar__in hierarchical1">
              <p>score: 20</p>
            </div>
          </div>
        </li>
        <li className="scoreList__item">
          <p>
            HierarchicalCategories : Womens {'>'} Bottoms {'>'} Leggings
          </p>
          <div className="scoreBar">
            <div className="scoreBar__in hierarchical2">
              <p>score 11</p>
            </div>
          </div>
        </li>
        <li className="scoreList__item">
          <p>Colors: Black</p>
          <div className="scoreBar">
            <div className="scoreBar__in colorBlack">
              <p>score 9</p>
            </div>
          </div>
        </li>
        <li className="scoreList__item">
          <p>Colors: Graphite Grey</p>
          <div className="scoreBar">
            <div className="scoreBar__in colorGrey">
              <p>score 3</p>
            </div>
          </div>
        </li>
        <li className="scoreList__item">
          <p>Colors: Heritage 365 Camo Deep Coal Multi</p>
          <div className="scoreBar">
            <div className="scoreBar__in colorCamo">
              <p>score 5</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default PersonaScore;
