import styled from 'styled-components';
import { tabletPortrait } from '../../../../styles/breakpoints';

const getColsToSpan = numberOfImages => {
  if(numberOfImages % 3 === 2) return 'span 2'
  if(numberOfImages % 3 === 1) return 'span 3'
}

export const GalleryWrapper = styled.div`
  
  //--varibles--//
  
  // We just need to know these 3 values up front
  	--gutter: 0px;
  	--wrapper: var(--content-width);
  	
  	--noOfColumns: 2;
  	
  	// Number of gutters is columns minus 1
  	--noOfGutters: calc(var(--noOfColumns) - 1);
  	
  	// Aspect ratio goes here
  	--ratioA: 1;
  	--ratioB: 1;
  	
  	// Use the aspect ratio to calculate the factor for multiplication
  	--factor: calc(var(--ratioB) / var(--ratioA));
  	
  	// Calculating the row height
  	--rh: calc(( (var(--wrapper) - (var(--noOfGutters) * var(--gutter))) 
  		/ var(--noOfColumns)) * var(--factor));
  	
  	@media (min-width: ${ tabletPortrait }) {
  		--gutter: 0px;
  		--noOfColumns: 3;
  	}
    
  //--end variables--//
  
  max-width: var(--wrapper);
	display: grid;
	grid-template-columns: repeat(var(--noOfColumns), minmax(0, 1fr));
	grid-auto-flow: dense;
  grid-template-rows: repeat(3, var(--rh));
	grid-gap: var(--gutter);
`

export const GalleryItem = styled.div`
  overflow: hidden;
  
  @media(min-width: ${ tabletPortrait }) {
    &:first-child {
      grid-column: span 2;
      grid-row: span 2;
    }
    
    &:nth-child(5) {
      grid-column: span 2;
    }
  }
`

export const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const FeaturedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`