import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  MenuDivider,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { HamburgerIcon, AddIcon, SearchIcon } from "@chakra-ui/icons";
const Layout = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <header>
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
              <MenuDivider />
              {auth.user ? (
                <MenuItem
                  onClick={() =>
                    auth.logout(() => navigate("/", { replace: true }))
                  }
                >
                  Выйти
                </MenuItem>
              ) : (
                <Link to="/login">
                  <MenuItem>Войти</MenuItem>
                </Link>
              )}
            </MenuList>
          </Menu>
        </div>
        {/* <div className="side-menu">
          <Link to="social">Добавить льготную/социальную карту</Link>
          <Link to="cards">Справочник</Link>
          <Link to="logout">Выйти</Link>
        </div> */}
      </header>

      <main className="container">
        <Outlet />
      </main>
    </>
  );
};

export { Layout };
