import useScreenSize from '../../hooks/useScreenSize';
const PersonaBox = () => {
  const { mobile, tablet } = useScreenSize();
  const styleFunction = () => {
    if (mobile && !tablet) {
      return 'box arrow-left box-mobile';
    }
    if (tablet && !mobile) {
      return 'box arrow-left box-tablet';
    }
    return 'box arrow-left box-desktop';
  };
  return <div className={styleFunction()}>Select your Persona</div>;
};

export default PersonaBox;
