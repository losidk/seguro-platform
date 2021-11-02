import {ReactNode} from 'react';
import styled from 'styled-components';
import {usePageNavigator} from "../../../../contexts/pageNavigator/PageNavigatorContext";
import {pageNavigator} from "../../../../contexts/pageNavigator/pageNavigatorActions";
import {motion} from 'framer-motion';
import {screenWidth} from "../../screenSizes";

export type TabActiveStyles = {
    borderColor?: string,
    color?: string,
    backgroundColor?: string
}

export type TabProps = {
    id: string,
    text: ReactNode | string,
    icon?: ReactNode,
    activeStyles?: TabActiveStyles
}

const StyledTab = styled(motion.button)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 50px;
  flex: 1;
  min-height: 50px;
  height: 100%;
  border: none;
  padding: 10px 0 calc(10px + env(safe-area-inset-bottom)) 0;
  transition: background-color 150ms ease-in-out, color 150ms ease-in-out;
  background-color: ${props => props.theme.ui.backgroundColor};
  color: ${props => props.theme.ui.text.textSecondary};
  position: relative;
  @media (${screenWidth.mediumWidth}) {
    min-height: 60px;
  }
`

const StyledIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  content: '';
  min-height: 20px;
  min-width: 20px;
  width: 100%;
  height: 100%;

  & > p {
    font-size: ${props => props.theme.ui.fontSizes.narrow.lg}
  }

  @media (${screenWidth.mediumWidth}) {
    & > p {
      font-size: ${props => props.theme.ui.fontSizes.narrow.md}
    }
  }
`

const StyledText = styled.p`
  word-break: break-all;
  display: none;
  @media (${screenWidth.mediumWidth}) {
    font-size: ${props => props.theme.ui.fontSizes.medium.sm};
    display: flex
  }
`

const StyledTabHighlight = styled(motion.div)`
  width: 100%;
  height: 100%;
  content: '';
  border-top: 3px solid transparent;
  position: absolute;
  top: 0;
  z-index: 100;
`

const Tab = ({id, text, icon, activeStyles}: TabProps) => {
    const {state, dispatch} = usePageNavigator()


    return (
        <StyledTab
            initial={false}
            onClick={() => dispatch(pageNavigator.navigateToPage(id))}
            style={{
                color: state.current[0] === id ? activeStyles?.color : '',
                backgroundColor: state.current[0] === id ? activeStyles?.backgroundColor : '',
            }}
        >
            <StyledIcon>
                {icon && icon}
            </StyledIcon>
            <StyledText>{text}</StyledText>
            {
                state.current[0] === id && (
                    <StyledTabHighlight
                        layoutId='tabHighlight'
                        initial={false}
                        animate={{
                            borderColor: activeStyles?.borderColor
                        }}
                        transition={{
                            type: "just"
                        }}
                    />
                )
            }
        </StyledTab>
    )
}

export default Tab;
