import { useState } from "react";

import propTypes from "prop-types";
import { element } from "prop-types";

import DeadLinkPopup from "../../DeadLinkPopup";
import { MenuIcon, UserCircleIcon } from "@heroicons/react/solid";

const RightMenu = ({ dropdownOpen, setDropdownOpen, navDropdownRef }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    setDropdownOpen(false);
  };

  return (
    <div className="header__navigation gap-1 hidden md:flex items-center">
      <div
        className="font-semibold hover:bg-gray-100 transition-colors duration-200 rounded-full cursor-pointer py-2 px-4"
        onClick={openModal}
      >
        Become a Host
      </div>
      <div className="dropdown-menu relative" ref={navDropdownRef}>
        <div
          className="dropdown-btn flex gap-1 border shadow-sm hover:shadow-md transition-shadow rounded-full cursor-pointer p-0.5 ml-1"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <MenuIcon className="w-5 ml-2" />
          <UserCircleIcon className="w-8" />
        </div>
        <div
          className={`${
            !dropdownOpen && "opacity-0 invisible"
          } dropdown-content absolute top-[calc(100%+12px)] right-0 min-w-[225px] bg-white z-20 whitespace-nowrap font-medium rounded-xl transition-all duration-300 overflow-hidden py-2`}
          style={{ boxShadow: "0 5px 30px 6px rgb(0 0 0 / .125)" }}
        >
          <DropdownItem clickHandler={openModal}>Sign Up</DropdownItem>
          <DropdownItem clickHandler={openModal}>Login</DropdownItem>
          <hr className="my-2" />
          <DropdownItem clickHandler={openModal}>Host your Home</DropdownItem>
          <DropdownItem clickHandler={openModal}>Live your Dreams</DropdownItem>
          <DropdownItem clickHandler={openModal}>Help</DropdownItem>
        </div>
      </div>

      <DeadLinkPopup
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

const DropdownItem = ({ children, clickHandler }) => (
  <div
    className="px-4 py-2 hover:bg-gray-100 transition-colors cursor-pointer"
    onClick={clickHandler}
  >
    {children}
  </div>
);

RightMenu.propTypes = {
  dropdownOpen: propTypes.bool.isRequired,
  setDropdownOpen: propTypes.func.isRequired,
  navDropdownRef: propTypes.object.isRequired,
};

DropdownItem.propTypes = {
  children: propTypes.string.isRequired,
  clickHandler: propTypes.func.isRequired,
};

export default RightMenu;
