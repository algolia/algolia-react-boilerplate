import { useEffect, useState } from 'react'

import { hitsConfig } from '@/config/hitsConfig'

import { useRecoilValue } from 'recoil'

import { isPersonnaEventToggle } from '@/config/demoGuideConfig'

import { personaSelectedFiltersAtom } from '@/config/personaConfig'

import { windowSize } from '@/hooks/useScreenSize'

const PersonaScore = (props) => {
  const { resultsScore, personaName } = props
  const { mobile } = useRecoilValue(windowSize)
  const isSwitchToggle = useRecoilValue(isPersonnaEventToggle)

  const personalizationFilters = useRecoilValue(personaSelectedFiltersAtom)

  const {
    colour,
    hierarchicalCategoriesLvl0,
    hierarchicalCategoriesLvl1,
    hierarchicalCategoriesLvl2,
    genderFilter,
    brand,
  } = hitsConfig

  const [scorePersona, setScorePersona] = useState({
    color: [],
    brand: [],
    gender: [],
    hierarchical0: [],
    hierarchical1: [],
    hierarchical2: [],
    category: [],
    categories: [],
  })

  const handleNewPersona = (newParams, newPersona) => {
    return { ...newPersona, ...newParams }
  }

  useEffect(() => {
    const newPersona = {
      color: [],
      brand: [],
      gender: [],
      hierarchical0: [],
      hierarchical1: [],
      hierarchical2: [],
      category: [],
      categories: [],
    }

    treatResults(newPersona)
  }, [resultsScore, isSwitchToggle])

  useEffect(() => {
    const newPersona = {
      color: [],
      brand: [],
      gender: [],
      hierarchical0: [],
      hierarchical1: [],
      hierarchical2: [],
      category: [],
      categories: [],
    }
    if (!isSwitchToggle) {
      let newState = newPersona
      personalizationFilters.map((filter) => {
        if (filter.split('<')[0].includes(genderFilter)) {
          const newFilterKey = filter.split('<')[0].split(':')[1]
          const newFilterValue = filter
            .split('<')[1]
            .split('=')[1]
            .replace('>', '')
          const newObject = {
            [newFilterKey]: newFilterValue,
          }
          newState = handleNewPersona({ gender: [newObject] }, newState)
        }
      })
      personalizationFilters.map((filter) => {
        if (filter.split('<')[0].includes(brand)) {
          const newFilterKey = filter.split('<')[0].split(':')[1]
          const newFilterValue = filter
            .split('<')[1]
            .split('=')[1]
            .replace('>', '')
          const newObject = {
            [newFilterKey]: newFilterValue,
          }
          newState = handleNewPersona({ brand: [newObject] }, newState)
        }
      })
      personalizationFilters.map((filter) => {
        if (filter.split('<')[0].includes(colour)) {
          const newFilterKey = filter.split('<')[0].split(':')[1]
          const newFilterValue = filter
            .split('<')[1]
            .split('=')[1]
            .replace('>', '')
          const newObject = {
            [newFilterKey]: newFilterValue,
          }
          newState = handleNewPersona({ color: [newObject] }, newState)
        }
      })
      personalizationFilters.map((filter) => {
        if (filter.split('<')[0].includes(hierarchicalCategoriesLvl0)) {
          const newFilterKey = filter.split('<')[0].split(':')[1]
          const newFilterValue = filter
            .split('<')[1]
            .split('=')[1]
            .replace('>', '')
          const newObject = {
            [newFilterKey]: newFilterValue,
          }
          newState = handleNewPersona({ hierarchical0: [newObject] }, newState)
        }
      })
      personalizationFilters.map((filter) => {
        if (filter.split('<')[0].includes(hierarchicalCategoriesLvl1)) {
          const newFilterKey = filter.split('<')[0].split(':')[1]
          const newFilterValue = filter
            .split('<')[1]
            .split('=')[1]
            .replace('>', '')
          const newObject = {
            [newFilterKey]: newFilterValue,
          }
          newState = handleNewPersona({ hierarchical1: [newObject] }, newState)
        }
      })
      personalizationFilters.map((filter) => {
        if (filter.split('<')[0].includes(hierarchicalCategoriesLvl2)) {
          const newFilterKey = filter.split('<')[0].split(':')[1]
          const newFilterValue = filter
            .split('<')[1]
            .split('=')[1]
            .replace('>', '')
          const newObject = {
            [newFilterKey]: newFilterValue,
          }
          newState = handleNewPersona({ hierarchical2: [newObject] }, newState)
        }
      })
      setScorePersona(newState)
    }
  }, [isSwitchToggle, resultsScore])

  //Process the results for each attribute
  const treatResults = (newPersona) => {
    let newState = newPersona

    // For Attribute Color
    if (resultsScore.hasOwnProperty(colour)) {
      newState = handleNewPersona({ color: [resultsScore.colour] }, newState)
    }

    // For Attribute Gender
    if (resultsScore.hasOwnProperty(genderFilter)) {
      newState = handleNewPersona(
        { gender: [resultsScore.genderFilter] },
        newState
      )
    }
    // For Attribute Hierarchical level 0
    if (resultsScore.hasOwnProperty(hierarchicalCategoriesLvl0)) {
      newState = handleNewPersona(
        {
          hierarchical0: [resultsScore[hierarchicalCategoriesLvl0.toString()]],
        },
        newState
      )
    }
    // For Attribute Hierarchical level 1
    if (resultsScore.hasOwnProperty(hierarchicalCategoriesLvl1)) {
      newState = handleNewPersona(
        {
          hierarchical1: [resultsScore[hierarchicalCategoriesLvl1.toString()]],
        },
        newState
      )
    }
    // For Attribute Hierarchical level 2\
    if (resultsScore.hasOwnProperty(hierarchicalCategoriesLvl2)) {
      newState = handleNewPersona(
        {
          hierarchical2: [resultsScore[hierarchicalCategoriesLvl2.toString()]],
        },
        newState
      )
    }
    // For Attribute Brand
    if (resultsScore.hasOwnProperty(brand)) {
      newState = handleNewPersona({ brand: [resultsScore.brand] }, newState)
    }

    setScorePersona(newState)
  }

  return (
    <>
      {isSwitchToggle ? (
        <div className="appliedRules__persona">
          <h3>{personaName}'s affinities</h3>
          <ul className="scoreList">
            {scorePersona.gender.length > 0 &&
              Object.entries(scorePersona.gender[0]).map((cat) => {
                return (
                  <li className="scoreList__item">
                    <p>Gender : {cat[0]}</p>
                    <div className={`scoreBar ${mobile && 'mobile-scoreBar'}`}>
                      <div
                        className="scoreBar__in colorGender"
                        style={{ width: `${cat[1]}%` }}
                      >
                        <p>score: {cat[1]}.</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            {scorePersona.hierarchical0.length > 0 &&
              Object.entries(scorePersona.hierarchical0[0]).map((cat) => {
                return (
                  <li className="scoreList__item">
                    <p>HierarchicalCategories : {cat[0]}</p>
                    <div className={`scoreBar ${mobile && 'mobile-scoreBar'}`}>
                      <div
                        className="scoreBar__in hierarchical1"
                        style={{ width: `${cat[1]}%` }}
                      >
                        <p>score: {cat[1]}.</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            {scorePersona.hierarchical1.length > 0 &&
              Object.entries(scorePersona.hierarchical1[0]).map((cat) => {
                return (
                  <li className="scoreList__item">
                    <p>HierarchicalCategories : {cat[0]}</p>
                    <div className={`scoreBar ${mobile && 'mobile-scoreBar'}`}>
                      <div
                        className="scoreBar__in hierarchical2"
                        style={{ width: `${cat[1]}%` }}
                      >
                        <p>score: {cat[1]}.</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            {scorePersona.hierarchical2.length > 0 &&
              Object.entries(scorePersona.hierarchical2[0]).map((cat) => {
                return (
                  <li className="scoreList__item">
                    <p>HierarchicalCategories : {cat[0]}</p>
                    <div className={`scoreBar ${mobile && 'mobile-scoreBar'}`}>
                      <div
                        className="scoreBar__in hierarchical3"
                        style={{ width: `${cat[1]}%` }}
                      >
                        <p>score: {cat[1]}.</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            {scorePersona.color.length > 0 &&
              Object.entries(scorePersona.color[0]).map((color) => {
                return (
                  <li className="scoreList__item">
                    <p>Colors:{color[0]}</p>
                    <div className={`scoreBar ${mobile && 'mobile-scoreBar'}`}>
                      <div
                        className="scoreBar__in colorBlack"
                        style={{
                          width: `${color[1]}%`,
                          background: `
                        linear-gradient(
                          60deg,
                          ${color[0]} 16%,
                          rgba(27, 27, 27, 1) 79%,
                          rgba(249, 249, 249, 0.0970982142857143) 100%
                        )
                        `,
                        }}
                      >
                        <p>score {color[1]}.</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            {scorePersona.category.length > 0 &&
              Object.entries(scorePersona.category[0]).map((cat) => {
                return (
                  <li className="scoreList__item">
                    <p>Category : {cat[0]}</p>
                    <div className={`scoreBar ${mobile && 'mobile-scoreBar'}`}>
                      <div
                        className="scoreBar__in colorCategory"
                        style={{ width: `${cat[1]}%` }}
                      >
                        <p>score: {cat[1]}.</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            {scorePersona.brand.length > 0 &&
              Object.entries(scorePersona.brand[0]).map((cat) => {
                return (
                  <li className="scoreList__item">
                    <p>Brand : {cat[0]}</p>
                    <div className={`scoreBar ${mobile && 'mobile-scoreBar'}`}>
                      <div
                        className="scoreBar__in colorBrand"
                        style={{ width: `${cat[1]}%` }}
                      >
                        <p>score: {cat[1]}.</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            {scorePersona.categories.length > 0 &&
              Object.entries(scorePersona.categories[0]).map((cat) => {
                return (
                  <li className="scoreList__item">
                    <p>Categories : {cat[0]}</p>
                    <div className={`scoreBar ${mobile && 'mobile-scoreBar'}`}>
                      <div
                        className="scoreBar__in colorCategories"
                        style={{ width: `${cat[1]}%` }}
                      >
                        <p>score: {cat[1]}.</p>
                      </div>
                    </div>
                  </li>
                )
              })}
          </ul>
        </div>
      ) : (
        <div className="appliedRules__persona">
          <h3>{personaName}'s affinities</h3>
          <ul className="scoreList">
            {scorePersona.gender.length > 0 &&
              Object.entries(scorePersona.gender[0]).map((cat) => {
                return (
                  <li className="scoreList__item">
                    <p>Gender : {cat[0]}</p>
                    <div className={`scoreBar ${mobile && 'mobile-scoreBar'}`}>
                      <div
                        className="scoreBar__in colorGender"
                        style={{ width: `${cat[1]}%` }}
                      >
                        <p>score: {cat[1]}.</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            {scorePersona.hierarchical0.length > 0 &&
              Object.entries(scorePersona.hierarchical0[0]).map((cat) => {
                return (
                  <li className="scoreList__item">
                    <p>HierarchicalCategories : {cat[0]}</p>
                    <div className={`scoreBar ${mobile && 'mobile-scoreBar'}`}>
                      <div
                        className="scoreBar__in hierarchical1"
                        style={{ width: `${cat[1]}%` }}
                      >
                        <p>score: {cat[1]}.</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            {scorePersona.hierarchical1.length > 0 &&
              Object.entries(scorePersona.hierarchical1[0]).map((cat) => {
                return (
                  <li className="scoreList__item">
                    <p>HierarchicalCategories : {cat[0]}</p>
                    <div className={`scoreBar ${mobile && 'mobile-scoreBar'}`}>
                      <div
                        className="scoreBar__in hierarchical2"
                        style={{ width: `${cat[1]}%` }}
                      >
                        <p>score: {cat[1]}.</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            {scorePersona.hierarchical2.length > 0 &&
              Object.entries(scorePersona.hierarchical2[0]).map((cat) => {
                return (
                  <li className="scoreList__item">
                    <p>HierarchicalCategories : {cat[0]}</p>
                    <div className={`scoreBar ${mobile && 'mobile-scoreBar'}`}>
                      <div
                        className="scoreBar__in hierarchical3"
                        style={{ width: `${cat[1]}%` }}
                      >
                        <p>score: {cat[1]}.</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            {scorePersona.color.length > 0 &&
              Object.entries(scorePersona.color[0]).map((color) => {
                return (
                  <li className="scoreList__item">
                    <p>Colors:{color[0]}</p>
                    <div className={`scoreBar ${mobile && 'mobile-scoreBar'}`}>
                      <div
                        className="scoreBar__in colorBlack"
                        style={{
                          width: `${color[1]}%`,
                          background: `
                        linear-gradient(
                          60deg,
                          ${color[0]} 16%,
                          rgba(27, 27, 27, 1) 79%,
                          rgba(249, 249, 249, 0.0970982142857143) 100%
                        )
                        `,
                        }}
                      >
                        <p>score {color[1]}.</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            {scorePersona.category.length > 0 &&
              Object.entries(scorePersona.category[0]).map((cat) => {
                return (
                  <li className="scoreList__item">
                    <p>Category : {cat[0]}</p>
                    <div className={`scoreBar ${mobile && 'mobile-scoreBar'}`}>
                      <div
                        className="scoreBar__in colorCategory"
                        style={{ width: `${cat[1]}%` }}
                      >
                        <p>score: {cat[1]}.</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            {scorePersona.brand.length > 0 &&
              Object.entries(scorePersona.brand[0]).map((cat) => {
                return (
                  <li className="scoreList__item">
                    <p>Brand : {cat[0]}</p>
                    <div className={`scoreBar ${mobile && 'mobile-scoreBar'}`}>
                      <div
                        className="scoreBar__in colorBrand"
                        style={{ width: `${cat[1]}%` }}
                      >
                        <p>score: {cat[1]}.</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            {scorePersona.categories.length > 0 &&
              Object.entries(scorePersona.categories[0]).map((cat) => {
                return (
                  <li className="scoreList__item">
                    <p>Categories : {cat[0]}</p>
                    <div className={`scoreBar ${mobile && 'mobile-scoreBar'}`}>
                      <div
                        className="scoreBar__in colorCategories"
                        style={{ width: `${cat[1]}%` }}
                      >
                        <p>score: {cat[1]}.</p>
                      </div>
                    </div>
                  </li>
                )
              })}
          </ul>
        </div>
      )}
    </>
  )
}

export default PersonaScore
