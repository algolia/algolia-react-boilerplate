import { useEffect, useState } from 'react'

import { useInstantSearch } from 'react-instantsearch-hooks-web'

import { useRecoilState, useRecoilValue } from 'recoil'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Config import
import { rulesAtom, rulesIdsAtom } from '@/config/appliedRulesConfig'
import { scorePersonadAtom } from '@/config/demoGuideConfig'
import { personaSelectedName } from '@/config/personaConfig'

import FetchAndFormatAlgoliaRules from '@/hooks/useFetchAndFormatAlgoliaRules'

//Import scope SCSS
import './SCSS/appliedRules.scss'

//Import PersonaScore Component
import PersonaScore from './PersonaScore'
import { ChevronDown, ChevronUp } from '@/assets/svg/SvgIndex'

function CustomAppliedRules(props) {
  // Hold state to show/hide the panel
  const [minimisedModal, setMinimisedModal] = useState(false)

  const { results } = useInstantSearch(props)

  const [rules, setRules] = useRecoilState(rulesAtom)
  const [rulesIds, setRulesIds] = useRecoilState(rulesIdsAtom)

  //Get score from Persona
  const resultsScore = useRecoilValue(scorePersonadAtom)
  const personaName = useRecoilValue(personaSelectedName)

  const trim = (values) => values.slice(0, 5)

  useEffect(() => {
    const fetchRuleDetails = async (rulesIds) => {
      const results = await FetchAndFormatAlgoliaRules(rulesIds)
      setRules(results)
      return
    }

    // if there are applied rules and they don't equal to what's stored
    if (results?.appliedRules !== null && rulesIds !== results.appliedRules) {
      // Assign rules applied to a variable
      let rulesApplied = results?.appliedRules

      // Set the rules applied inside an atom
      setRulesIds(rulesApplied)

      // will update rules atom to hold the details of currently applied rules
      fetchRuleDetails(rulesApplied)
    }
  }, [results, results.appliedRules])

  return (
    <div className="appliedRules">
      {rules.length > 0 ? (
        <div className="appliedRules__wp">
          <div className="rule-top">
            <div className="rules-number">
              <p>
                {rules.length +
                  ' rule' +
                  (rules.length > 1 ? 's' : '') +
                  ' applied'}
              </p>
            </div>
            <div
              className="rule-minimiseBtn"
              onClick={() => setMinimisedModal(!minimisedModal)}
            >
              {minimisedModal ? <ChevronUp /> : <ChevronDown />}
              <p>{minimisedModal ? 'Show ' : 'Hide '} Panel</p>
            </div>
          </div>
          {resultsScore && personaName !== 'No Persona' && (
            <PersonaScore
              resultsScore={resultsScore}
              personaName={personaName}
            />
          )}

          <ul
            className={
              minimisedModal
                ? 'appliedRules__list appliedRules__list-inactive'
                : 'appliedRules__list appliedRules__list-active'
            }
          >
            <div className="rules-headers">
              <h3>Type</h3>
              <h3>Description</h3>
              <h3>Triggers</h3>
              <h3>Consequences</h3>
            </div>
            {rules.map((rule, i) => {
              return (
                <div key={rule.name} className="single-rule">
                  {/* Is rule a manual or visual editor one? */}
                  <div className="rule-type">
                    {rule.tags?.includes('visual-editor') ? (
                      <FontAwesomeIcon className="icon" icon="desktop" />
                    ) : (
                      <FontAwesomeIcon className="icon" icon="sliders" />
                    )}
                    <p>
                      {rule.tags?.includes('visual-editor')
                        ? 'Visual'
                        : 'Manual'}
                    </p>
                  </div>

                  {/* Description of the rule */}
                  <div className="rule-description">
                    <p>{rule.description}</p>
                  </div>
                  {/* Triggers of the rule */}
                  <div className="rule-triggers-container">
                    {rule.triggers?.length
                      ? rule.triggers?.map((trigger, i) => {
                          return trigger.map(
                            (innerTrigger, i) =>
                              `${innerTrigger.label} : ${innerTrigger.value}`
                          )
                        })
                      : 'Conditionless rule'}
                  </div>
                  {/* Strategy of the rule */}
                  <div className="rule-strategy-container">
                    {rule.strategies?.map((strategy, i) => {
                      return (
                        <>
                          <span className="label">{strategy.label}</span>
                          {strategy.multiple && (
                            <p>{JSON.stringify(trim(strategy.value))}</p>
                          )}
                        </>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </ul>
        </div>
      ) : (
        <div className="appliedRules__wp">
          <p className="appliedRules__noResult">No rules are applied</p>
        </div>
      )}
    </div>
  )
}

export default CustomAppliedRules
