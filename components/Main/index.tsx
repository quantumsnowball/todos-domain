import { Stretch, CenterContent, Overflow } from '../styled/containers'
import { styled } from '@mui/material'
import { CustomFC } from '../../types/frontend'


// .main-ctn
const CenteredDiv = styled(Overflow(Stretch(CenterContent('div'))))`
`

const Main: CustomFC = ({ children }) => {
  return (
    <CenteredDiv id='main-ctn'>
      {children}
    </CenteredDiv>
  )
}

export default Main
