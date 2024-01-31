import { IconProps } from '@mui/material';
import { ComponentType } from 'react';
import { SvgIconComponent } from '@mui/icons-material';


export interface ISidebarItem {
  name: string,
  alias?: string,
  onClick?: () => void,
  icon: ComponentType<IconProps> | SvgIconComponent,
  url: string,
}
