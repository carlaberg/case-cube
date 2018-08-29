import React from 'react';
import { List, ListItemWrapper, Category, ListEntry, Divider } from './styles';

const InfoList = ({ info }) => {
  
  const listItems = info.map((item, index) => {
      const lastInfoItem = info.length - 1;
    
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