import { Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ISidebarItem } from '@/interfaces/ISidebarItem';

interface Props {
  items: ISidebarItem[],
  isSelected: (item: ISidebarItem) => boolean
}

export const SidebarListItem = ({items = [], isSelected}: Props) => {
  return (
    <List>
      {items.map((item: any) => (
        <ListItem key={item.name} sx={{color: 'primary'}}>
          <ListItemButton component={Link} href={item.url} selected={isSelected(item)}>
            <ListItemIcon>
              <item.icon color="primary"/>
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{color: 'primary'}} primary={item.name}/>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
