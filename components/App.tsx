import { styled } from '@mui/material'
import { CustomFC } from '../types'
import MenuBar from './MenuBar'
import Main from './Main'
import { CenterContent } from './styled/containers'


const FlexColumnDiv = styled(CenterContent('div'))`
  /* cover full viewport */
  height: 100vh;
  max-height: 100vh;
  justify-content: space-between;
  /* theme */
  color: ${props => props.theme.palette.text.primary};
  background-color: ${props => props.theme.palette.background.default};
`

const App: CustomFC = ({ children }) => {
  return (
    <FlexColumnDiv id="app-ctn">
      <MenuBar />
      <Main> {children} </Main>
    </FlexColumnDiv>
  )
}

export default App
