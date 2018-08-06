import styled from 'styled-components';
import { desktopDesigner } from '../../../styles/breakpoints';

export const SiteContainer = styled.main`
  max-width: ${ desktopDesigner };
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const ContentContainer = styled.div`
  flex: 1 0 auto;
  position: relative;
`