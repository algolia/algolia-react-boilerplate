import { memo, useEffect } from 'react'

// Algolias's import
import { Configure, Index } from 'react-instantsearch-hooks-web'

// framer motion
import { motion } from 'framer-motion'
import { framerMotionFederatedContainer } from '@/config/animationConfig'

// import from Recoil
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

// Config
import { indexNames, searchClient } from '@/config/algoliaEnvConfig'

// Show or unshow sections in federated (product, suggestions, categories, articles, recent searches)
// categories import is here to choose which attribute you want to show as category
import {
  federatedCategoriesAttribute,
  federatedRef,
  federatedSearchConfig,
  shouldHaveOpenFederatedSearch,
} from '@/config/federatedConfig'

import { searchBoxAtom } from '@/config/searchboxConfig'

// Import Persona State from recoil
import {
  personalizationImpact,
  personaObjectSelectedAtom,
} from '@/config/personaConfig'

// Import Segment State from recoil
import { segmentObjectSelectedAtom } from '@/config/segmentConfig'

// Import refs for modal closing functionality
import { selectorNavigationRef } from '@/config/navigationConfig'

// hook import
// Check if user is clecking outside an element
import useOutsideClickTwoConditionals from '@/hooks/useOutsideClickTwoConditions'
// Check screensize for responsiveness
import { windowSize } from '@/hooks/useScreenSize'

//Use Translation
import { useTranslation } from 'react-i18next'

// Components imports
import { ChevronLeft } from '@/assets/svg/SvgIndex'
import Articles from './components/BlogPost'
import Category from './components/Category'
import Products from './components/Products'
import QuerySuggestions from './components/QuerySuggestions'
import RecentSearches from './components/RecentSearches'

//Import scope SCSS
import './SCSS/federatedSearch.scss'

import { useSearchBox } from 'react-instantsearch-hooks-web'

const FederatedSearch = ({ query, refine }) => {
  // Persona
  const persona = useRecoilValue(personaObjectSelectedAtom)

  const segment = useRecoilValue(segmentObjectSelectedAtom)
  const setIsFederated = useSetRecoilState(shouldHaveOpenFederatedSearch)
  const searchboxRef = useRecoilValue(searchBoxAtom)

  //Get reference for dropdowns in Navigation
  const selector = useRecoilValue(selectorNavigationRef)

  // Get Indexes Name
  const { suggestionsIndex, articlesIndex } = useRecoilValue(indexNames)

  const [containerFederated, setContainerFederated] =
    useRecoilState(federatedRef)

  // Get screen size
  const { mobile, tablet, isDesktop } = useRecoilValue(windowSize)

  // Import const translation
  // Use the translator
  const { t } = useTranslation('translation', {
    keyPrefix: 'federated',
  })

  // Custom hook
  useOutsideClickTwoConditionals(
    containerFederated,
    searchboxRef,
    selector,
    () => setIsFederated(false)
  )

  useEffect(() => {
    return () => {
      setIsFederated(false)
    }
  }, [])

  // Federated search configuration
  const {
    showRecentSearches,
    showQuerySuggestions,
    showCategories,
    showBlogPosts,
    showProducts,
  } = federatedSearchConfig

  return (
    <motion.div
      className={`${
        mobile || tablet ? 'federatedSearch-mobile' : 'federatedSearch'
      }`}
      // ref={setContainerFederated}
      variants={framerMotionFederatedContainer}
      initial={framerMotionFederatedContainer.initial}
      animate={framerMotionFederatedContainer.animate}
      exit={framerMotionFederatedContainer.exit}
      transition={framerMotionFederatedContainer.transition}
    >
      {!isDesktop && (
        <div className="closeFederated" onClick={() => setIsFederated(false)}>
          <ChevronLeft /> <p>{t('buttonReturn')}</p>
        </div>
      )}
      <div
        className={`${
          mobile || tablet
            ? 'federatedSearch__wrapper-mobile'
            : 'federatedSearch__wrapper'
        }`}
      >
        <div className="federatedSearch__left">
          {/* If don't want this sections go into config file  */}
          {showRecentSearches && !mobile && !tablet && (
            <RecentSearches
              query={query}
              refine={refine}
              title={t('recentSearches')}
            />
          )}
          {/* If don't want this sections go into config file  */}
          {/* {showQuerySuggestions && (
            <Index searchClient={searchClient} indexName={suggestionsIndex}>
              <Configure
                hitsPerPage={3}
                query={query}
                userToken={persona.value}
                enablePersonalization={true}
                personalizationImpact={personalizationImpact}
                personalizationFilters={persona.personalizationFilters}
              />
              <QuerySuggestions title={t('suggestions')} />
            </Index>
          )} */}
          {/* If don't want this sections go into config file  */}
          {showCategories && !mobile && !tablet && (
            <Category
              query={query}
              refine={refine}
              attribute={federatedCategoriesAttribute}
              title={t('categories')}
            />
          )}
        </div>
        {/* If don't want this sections go into config file  */}
        {showProducts && (
          <div className="federatedSearch__middle">
            <Products
              query={query}
              refine={refine}
              products={t('products')}
              productsBefore={t('productsBefore')}
              buttonShowAll={t('buttonShowAll')}
              noResults={t('noResults')}
            />
          </div>
        )}
        {/* If don't want this sections go into config file  */}
        {showBlogPosts && !mobile && !tablet && (
          <div className="articles federatedSearch__right">
            <Index indexName={articlesIndex}>
              <Configure hitsPerPage={1} query={query} />
              <Articles titleArticles={t('articles')} />
            </Index>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default memo(FederatedSearch)
