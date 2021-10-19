const INIT_STATE = {
  menuList: [
    {
      nm_menu: "Home",
      icon_menu: "",
    },
    {
      nm_menu: "Dashboard",
      icon_menu: "",
    },
    {
      nm_menu: "Orders",
      icon_menu: "",
    },
    {
      nm_menu: "Products",
      icon_menu: "",
    },
    {
      nm_menu: "Customer",
      icon_menu: "",
    },
  ],
  optionsFilter: [],
  isLoading: false,
  selected: null,
};

export const menuReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_MENU":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
