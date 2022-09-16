import { styled } from '@mui/material'
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

const App = () => {
  return (
    <FlexColumnDiv className="app-ctn">
      <p> App Component </p>
    </FlexColumnDiv>
  )
}

export default App
