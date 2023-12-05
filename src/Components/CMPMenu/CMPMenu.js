import React, { useState } from "react";
import { HiDotsVertical, HiDotsHorizontal } from "react-icons/hi"; // Import the icons

const CMPMenu = ({ options, orientation = "vertical", disabled = false }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.stopPropagation();
    if (open) {
      // If the menu is open, close it
      setAnchorEl(null);
    } else {
      // If the menu is closed, open it
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className="">
      <button aria-label="more" onClick={handleClick} disabled={disabled}>
        {orientation === "vertical" ? (
          <HiDotsVertical className="text-xl" />
        ) : (
          <HiDotsHorizontal className="text-xl" />
        )}
      </button>
      {open && (
        <div
          style={{
            position: "fixed",
            top: anchorEl.getBoundingClientRect().bottom,
            left: anchorEl.getBoundingClientRect().left,
          }}
          className="bg-gray-100 rounded-md p-3 gap-3 z-50"
        >
          {options.map((option, optionIndex) => (
            <div
              key={optionIndex}
              onClick={(e) => {
                option.onClick();
                handleClose(e);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CMPMenu;
