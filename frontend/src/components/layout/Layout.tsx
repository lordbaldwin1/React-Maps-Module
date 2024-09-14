/**
 * Layout component for the application's main structure.
 * @module
 */

import React from "react";
import { useSelector } from "react-redux";
import { selectIsDarkMode } from "../../store/slices/themeSlice";
import styled from "styled-components";

/**
 * Styled component for the layout wrapper.
 */
const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

/**
 * Styled component for the main content area.
 */
const MainContent = styled.main`
  flex: 1;
`;

/**
 * Props for the Layout component.
 */
export interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Layout component that provides the overall structure for the application.
 *
 * @param props - The props for the Layout component.
 * @returns A React element representing the application layout.
 */
const Layout: React.FC<LayoutProps> = ({
  children,
}: LayoutProps): React.ReactElement => {
  const isDarkMode = useSelector(selectIsDarkMode);

  //This is where a header & footer would be added.
  return (
    <LayoutWrapper className={`app ${isDarkMode ? "dark" : "light"}`}>
      <MainContent>{children}</MainContent>
    </LayoutWrapper>
  );
};

export default Layout;
