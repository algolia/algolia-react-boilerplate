import { useEffect, useState } from 'react';

import { hitsConfig } from '@/config/hitsConfig';

const PersonaScore = (props) => {
  const { resultsScore, personaName } = props;
  const {
    colour,
    hierarchicalCategoriesLvl0,
    hierarchicalCategoriesLvl1,
    hierarchicalCategoriesLvl2,
    hierarchicalCategoriesLvl3,
    genderFilter,
    category,
    brand,
    categories,
  } = hitsConfig;
  // const [colourArray, setColourArray] = useState([]);
  // const [genderArray, setGenderArray] = useState([]);
  // const [hierarchical0Array, sethierarchical0Array] = useState([]);
  // const [hierarchical1Array, sethierarchical1Array] = useState([]);
  // const [hierarchical2Array, sethierarchical2Array] = useState([]);
  // const [categoryArray, setCategoryArray] = useState([]);
  // const [brandArray, setBrandArray] = useState([]);
  // const [categoriesArray, setCategoriesArray] = useState([]);
  const [scorePersona, setScorePersona] = useState({
    color: [],
    brand: [],
    gender: [],
    hierarchical0: [],
    hierarchical1: [],
    hierarchical2: [],
    category: [],
    categories: [],
  });

  useEffect(() => {
    //Reset array after change persona or reload
    setScorePersona({
      color: [],
      brand: [],
      gender: [],
      hierarchical0: [],
      hierarchical1: [],
      hierarchical2: [],
      category: [],
      categories: [],
    });
    //Process the results for each attribute
    const treatResults = () => {
      console.log(resultsScore);
      // For Attribute Color
      if (resultsScore.hasOwnProperty(colour)) {
        if (scorePersona.color.length > 0) {
          setScorePersona({
            ...scorePersona,
            color: [...scorePersona.color, resultsScore.colour],
          });
        }
        console.log('if color', resultsScore.colour);
        setScorePersona({ ...scorePersona, color: [resultsScore.colour] });
        console.log(scorePersona);
      }
      // For Attribute Gender
      if (resultsScore.hasOwnProperty(genderFilter)) {
        if (scorePersona.gender.length > 0) {
          setScorePersona({
            ...scorePersona,
            gender: [...scorePersona.gender, resultsScore.genderFilter],
          });
        }
        setScorePersona({
          ...scorePersona,
          gender: [resultsScore.genderFilter],
        });
      }
      // For Attribute Hierarchical level 0
      // if (resultsScore.hasOwnProperty(hierarchicalCategoriesLvl0)) {
      //   if (hierarchical0Array.length > 0) {
      //     sethierarchical0Array([
      //       ...hierarchical0Array,
      //       resultsScore[hierarchicalCategoriesLvl0.toString()],
      //     ]);
      //   }
      //   sethierarchical0Array([
      //     resultsScore[hierarchicalCategoriesLvl0.toString()],
      //   ]);
      // }
      // For Attribute Hierarchical level 1
      // if (resultsScore.hasOwnProperty(hierarchicalCategoriesLvl1)) {
      //   if (hierarchical1Array.length > 0) {
      //     sethierarchical1Array([
      //       ...hierarchical1Array,
      //       resultsScore[hierarchicalCategoriesLvl1.toString()],
      //     ]);
      //   }
      //   sethierarchical0Array([
      //     resultsScore[hierarchicalCategoriesLvl1.toString()],
      //   ]);
      // }
      // For Attribute Hierarchical level 2\
      if (resultsScore.hasOwnProperty(hierarchicalCategoriesLvl2)) {
        if (scorePersona.hierarchical2.length > 0) {
          setScorePersona({
            ...scorePersona,
            hierarchical2: [
              ...scorePersona.hierarchical2,
              resultsScore[hierarchicalCategoriesLvl2.toString()],
            ],
          });
        }
        setScorePersona({
          ...scorePersona,
          hierarchical2: resultsScore[hierarchicalCategoriesLvl2.toString()],
        });
      }
      // For Attribute Category
      // if (resultsScore.hasOwnProperty(category)) {
      //   if (categoryArray.length > 0) {
      //     setCategoryArray([...categoryArray, resultsScore.category]);
      //   }
      //   setCategoryArray([resultsScore.colour]);
      // }
      // For Attribute Brand
      // if (resultsScore.hasOwnProperty(brand)) {
      //   if (brandArray.length > 0) {
      //     setBrandArray([...brandArray, resultsScore.brand]);
      //   }
      //   setBrandArray([resultsScore.brand]);
      // }
    };
    treatResults();
  }, [resultsScore, personaName]);

  return (
    <div className="appliedRules__persona">
      <h3>{personaName}'s affinities</h3>
      <ul className="scoreList">
        {scorePersona.gender.length > 0 &&
          scorePersona.gender.map((gender) => {
            {
              return (
                <li className="scoreList__item">
                  <p>Gender : {Object.keys(gender)}</p>
                  <div className="scoreBar">
                    <div
                      className="scoreBar__in hierarchical1"
                      style={{ width: `${Object.values(gender)}%` }}
                    >
                      <p>score: {Object.values(gender)}.</p>
                    </div>
                  </div>
                </li>
              );
            }
          })}
        {/* {hierarchical0Array.length > 0 &&
          hierarchical0Array.map((hier) => {
            {
              return (
                <li className="scoreList__item">
                  <p>HierarchicalCategories : {Object.keys(hier)}</p>
                  <div className="scoreBar">
                    <div
                      className="scoreBar__in hierarchical2"
                      style={{ width: `${Object.values(hier)}%` }}
                    >
                      <p>score {Object.values(hier)}.</p>
                    </div>
                  </div>
                </li>
              );
            }
          })} */}
        {/* {hierarchical1Array.length > 0 &&
          hierarchical1Array.map((hier) => {
            {
              return (
                <li className="scoreList__item">
                  <p>HierarchicalCategories : {Object.keys(hier)}</p>
                  <div className="scoreBar">
                    <div
                      className="scoreBar__in hierarchical2"
                      style={{ width: `${Object.values(hier)}%` }}
                    >
                      <p>score {Object.values(hier)}.</p>
                    </div>
                  </div>
                </li>
              );
            }
          })}
          */}
        {scorePersona.hierarchical2.length > 0 &&
          scorePersona.hierarchical2.map((hier) => {
            {
              return (
                <li className="scoreList__item">
                  <p>HierarchicalCategories : {Object.keys(hier)}</p>
                  <div className="scoreBar">
                    <div
                      className="scoreBar__in hierarchical2"
                      style={{ width: `${Object.values(hier)}%` }}
                    >
                      <p>score {Object.values(hier)}.</p>
                    </div>
                  </div>
                </li>
              );
            }
          })}
        {scorePersona.color.length > 0 &&
          scorePersona.color.map((colour) => {
            {
              return (
                <li className="scoreList__item">
                  <p>Colors: {Object.keys(colour)}</p>
                  <div className="scoreBar">
                    <div
                      className="scoreBar__in colorBlack"
                      style={{
                        width: `${Object.values(colour)}%`,
                        background: `
                      linear-gradient(
                        60deg,
                        ${Object.keys(colour)} 16%,
                        rgba(27, 27, 27, 1) 79%,
                        rgba(249, 249, 249, 0.0970982142857143) 100%
                      )
                      `,
                      }}
                    >
                      <p>score {Object.values(colour)}.</p>
                    </div>
                  </div>
                </li>
              );
            }
          })}
        {/* {categoryArray.length > 0 &&
          categoryArray.map((categ) => {
            {
              return (
                <li className="scoreList__item">
                  <p>Category: {Object.keys(categ)}</p>
                  <div className="scoreBar">
                    <div
                      className="scoreBar__in colorCamo"
                      style={{ width: `${Object.values(categ)}%` }}
                    >
                      <p>score {Object.values(categ)}.</p>
                    </div>
                  </div>
                </li>
              );
            }
          })}
        {brandArray.length > 0 &&
          brandArray.map((brand) => {
            {
              return (
                <li className="scoreList__item">
                  <p>Brand: {Object.keys(brand)}</p>
                  <div className="scoreBar">
                    <div
                      className="scoreBar__in colorGrey"
                      style={{ width: `${Object.values(brand)}%` }}
                    >
                      <p>score {Object.values(brand)}.</p>
                    </div>
                  </div>
                </li>
              );
            }
          })}
        {categoriesArray.length > 0 &&
          categoriesArray.map((cat) => {
            {
              return (
                <li className="scoreList__item">
                  <p>Categories: {Object.keys(cat)}</p>
                  <div className="scoreBar">
                    <div
                      className="scoreBar__in colorGrey"
                      style={{ width: `${Object.values(cat)}%` }}
                    >
                      <p>score {Object.values(cat)}.</p>
                    </div>
                  </div>
                </li>
              );
            }
          })} */}
      </ul>
    </div>
  );
};

export default PersonaScore;
