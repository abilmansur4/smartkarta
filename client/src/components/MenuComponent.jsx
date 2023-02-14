import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon, AddIcon, SearchIcon } from "@chakra-ui/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const MenuComponent = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <div className="dropdown-menu">
        <Menu>
          <MenuButton
            maxW="20px"
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <Link to="social">
              <MenuItem icon={<AddIcon />}>
                Добавить льготную/социальную карту
              </MenuItem>
            </Link>

            {/* <Link to="school">
              <MenuItem icon={<AddIcon />}>Добавить школьную карту</MenuItem>
            </Link> */}

            <Link to="cards">
              <MenuItem icon={<SearchIcon />}>Справочник</MenuItem>
            </Link>
            {/* {auth.user && <MenuItem onClick={handleLogout}>Выйти</MenuItem>} */}
            {/* <MenuDivider />
              <MenuItem>
                Выйти
              </MenuItem> */}
            <Button
              onClick={() =>
                auth.logout(() => navigate("/", { replace: true }))
              }
            >
              Выйти
            </Button>
          </MenuList>
        </Menu>
      </div>
    </>
  );
};

export { MenuComponent };
