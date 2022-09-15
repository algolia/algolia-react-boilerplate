// React Router
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const objectForSubMenu = {
  AllOffers: [
    'Health & Beauty Offers',
    'Household Cleaning Offers',
    'Garden & Outdoor Offers',
    'Toys Offers',
  ],
  Home: [
    'Home',
    'Health & Beauty',
    'Decorating & DIY',
    'Garden & Outdoor',
    'Pets',
    'Stationery & Craft',
    'Shop by Brand',
    'Toys',
    'Christmas',
    'Storage',
    'Party & Gift Wrap',
    'Travel & Motoring',
  ],
  Backing: ['Cake Boards & Stands', 'Icing & Sugar Sprinkles'],
  Student: [
    'Student Cleaning',
    'Student Stationery',
    'Student Bedroom',
    'Student Health & Beauty',
    'Student Bathroom',
  ],
};

const switchRenderFunction = (categoryName) => {
  // navigate is used by React Router
  const navigate = useNavigate();

  switch (categoryName.name) {
    case 'All Offers':
      return objectForSubMenu.AllOffers.map((obj) => {
        return (
          <li
            className="submenu-container__ul__li"
            onClick={() => {
              navigate(`/search`, {
                state: {
                  type: categoryName.type,
                  name: categoryName.name,
                  action: `category.lvl1:'All Offers > ${obj}'`,
                },
              });
            }}
          >
            {obj}
          </li>
        );
      });
    case 'Baking & Decorating':
      return objectForSubMenu.Backing.map((obj) => {
        return (
          <li
            className="submenu-container__ul__li"
            onClick={() => {
              navigate(`/search`, {
                state: {
                  type: categoryName.type,
                  name: categoryName.name,
                  action: `category.lvl1:'Baking & Decorating > ${obj}'`,
                },
              });
            }}
          >
            {obj}
          </li>
        );
      });
    case 'Home':
      return objectForSubMenu.Home.map((obj) => {
        return (
          <li
            className="submenu-container__ul__li"
            onClick={() => {
              navigate(`/search`, {
                state: {
                  type: categoryName.type,
                  name: categoryName.name,
                  action: `category.lvl1:'Home > ${obj}'`,
                },
              });
            }}
          >
            {obj}
          </li>
        );
      });
    case 'Student Essentials':
      return objectForSubMenu.Student.map((obj) => {
        return (
          <li
            className="submenu-container__ul__li"
            onClick={() => {
              navigate(`/search`, {
                state: {
                  type: categoryName.type,
                  name: categoryName.name,
                  action: `category.lvl1:'Student Essentials > ${obj}'`,
                },
              });
            }}
          >
            {obj}
          </li>
        );
      });

    default:
      break;
  }
};

const SubMenu = ({ categoryName, setDisplaySubMenu }) => {
  const subMenuReference = useRef();
  return (
    <div
      className="submenu-container"
      onMouseLeave={() => {
        setDisplaySubMenu(false);
      }}
    >
      <ul className="submenu-container__ul">
        {switchRenderFunction(categoryName)}
      </ul>
      {categoryName.name === 'Baking & Decorating' && (
        <img
          src="https://media.istockphoto.com/photos/baking-ingredients-flour-eggs-sugar-butter-milk-and-spices-picture-id1167734101?k=20&m=1167734101&s=612x612&w=0&h=qAkU_4SHNAr6Ks08S5CQYkP_gJEOLDV9sMbfqoj0lkc="
          alt=""
        />
      )}
      {categoryName.name === 'All Offers' && (
        <img
          src="https://www.sortmyweddingoutfit.com/Content/smwo-theme/images/offers/all-offers-large.jpg"
          alt=""
        />
      )}
      {categoryName.name === 'Student Essentials' && (
        <img
          src="https://cdn-ejfid.nitrocdn.com/HahWXuLfKZbQhJjlzjiUHtqlxVqcJYyP/assets/static/optimized/rev-e1a6336/wp-content/uploads/2020/12/topic-faculty-active-engaged-students-1.png"
          alt=""
        />
      )}
      {categoryName.name === 'Home' && (
        <img
          src="https://play-lh.googleusercontent.com/rHIlOS9pb_qQ6H8DRmw6vzlth2CTWlXIpEuWa9nch-zhWn7zOE5-5RNZSlwfsGtlRiRF"
          alt=""
        />
      )}
    </div>
  );
};

export default SubMenu;
