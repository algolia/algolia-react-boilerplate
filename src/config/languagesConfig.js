// ------------------------------------------
// Configuration for languages switch accross the application
// ------------------------------------------
import { atom } from 'recoil';

export const languagesConfig = [
    { value: 'English', label: 'English' },
    {
      value: 'Spanish',
      label: 'Spanish',
    },
    {
      value: 'German',
      label: 'German',
    },
    {
      value: 'French',
      label: 'French',
    },
  ];

  // Please ignore this atom - DO NOT TOUCH
export const LanguageSelectedAtom = atom({
    key: 'LanguageSelected', // unique ID (with respect to other atoms/selectors)
    default: 'English', // default value (aka initial value)
  });

// Should the language selector be displayed on the screen  
export const shouldShowLanguageSelectedAtom = atom({
    key: 'shouldShowLanguageSelectedAtom', // unique ID (with respect to other atoms/selectors)
    default: true, // default value (aka initial value)
  });


  // Styles for persona selection dropdown, please ignore
export const styles = {
    container: () => ({
      border: 'none',
      position: 'relative',
      cursor: 'pointer',
    }),
    control: () => ({
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      width: '6rem',
      cursor: 'pointer',
    }),
    menu: () => ({
      position: 'absolute',
      marginTop: '1rem',
      background: 'white',
      width: '100%',
      zIndex: '10',
      boxShadow: '0px 3px 5px 1px rgba(50, 50, 50, 0.25);',
      borderRadius: '0.3rem',
      padding: '0rem',
      cursor: 'pointer',
    }),
    menuList: () => ({}),
    input: () => ({
      position: 'absolute',
      width: '100%',
      cursor: 'pointer',
      '&input': {
        cursor: 'pointer',
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    indicatorContainer: () => ({
      color: 'black',
      cursor: 'pointer',
    }),
    placeholder: () => ({
      fontFamily: "'Poppins', sans-serif",
      cursor: 'pointer',
    }),
    valueContainer: () => ({
      cursor: 'pointer',
    }),
    option: () => {
      return {
        textTransform: 'capitalize',
        fontFamily: "'Poppins', sans-serif",
        padding: '0.5rem',
        cursor: 'pointer',
        borderRadius: '0.3rem',
        fontSize: '1rem',
        '&:hover': {
          backgroundColor: 'black',
          color: 'white',
        },
      };
    },
    singleValue: () => ({
      fontFamily: "'Poppins', sans-serif",
      textTransform: 'capitalize',
      cursor: 'pointer',
      fontSize: '1rem',
    }),
    dropdownIndicator: () => ({
      color: 'black',
    }),
  };