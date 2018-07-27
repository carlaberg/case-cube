import React from 'react';
import { List, ListItemWrapper, Category, ListEntry, Divider } from './styles';

const InfoList = ({ caseInfo }) => {
  
  const listItems = caseInfo.map((item, index) => {
      const lastInfoItem = caseInfo.length - 1;
    
      return (
        <React.Fragment key={ index }>
          <ListItemWrapper>
            <Category>{ item.key }</Category>
            <ListEntry>{ item.value }</ListEntry>
          </ListItemWrapper>
          {(index < lastInfoItem && <Divider />)}
        </React.Fragment>
      )
  });
  
  return (
    <List>
      { listItems }
    </List>
  )
}

export default InfoList;