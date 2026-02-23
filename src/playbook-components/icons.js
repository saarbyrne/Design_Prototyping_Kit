/**
 * Icon names and wrapper for Playbook Components (replaces @kitman/playbook/icons).
 * Maps KITMAN_ICON_NAMES to MUI icons-material.
 */
import React from 'react';
import Close from '@mui/icons-material/Close';
import Star from '@mui/icons-material/Star';
import StarBorder from '@mui/icons-material/StarBorder';
import UploadFile from '@mui/icons-material/UploadFile';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import OpenInNew from '@mui/icons-material/OpenInNew';
import InsertDriveFileOutlined from '@mui/icons-material/InsertDriveFileOutlined';
import CheckCircle from '@mui/icons-material/CheckCircle';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

export const KITMAN_ICON_NAMES = {
  Close: 'Close',
  Star: 'Star',
  StarBorder: 'StarBorder',
  UploadFile: 'UploadFile',
  DeleteOutline: 'DeleteOutline',
  OpenInNewOutlined: 'OpenInNewOutlined',
  InsertDriveFileOutlined: 'InsertDriveFileOutlined',
  CheckCircle: 'CheckCircle',
  KeyboardArrowUpIcon: 'KeyboardArrowUpIcon',
  KeyboardArrowDownIcon: 'KeyboardArrowDownIcon',
};

const iconMap = {
  [KITMAN_ICON_NAMES.Close]: Close,
  [KITMAN_ICON_NAMES.Star]: Star,
  [KITMAN_ICON_NAMES.StarBorder]: StarBorder,
  [KITMAN_ICON_NAMES.UploadFile]: UploadFile,
  [KITMAN_ICON_NAMES.DeleteOutline]: DeleteOutline,
  [KITMAN_ICON_NAMES.OpenInNewOutlined]: OpenInNew,
  [KITMAN_ICON_NAMES.InsertDriveFileOutlined]: InsertDriveFileOutlined,
  [KITMAN_ICON_NAMES.CheckCircle]: CheckCircle,
  [KITMAN_ICON_NAMES.KeyboardArrowUpIcon]: KeyboardArrowUp,
  [KITMAN_ICON_NAMES.KeyboardArrowDownIcon]: KeyboardArrowDown,
};

export function KitmanIcon({ name, ...props }) {
  const IconComponent = iconMap[name];
  if (!IconComponent) {
    return null;
  }
  return <IconComponent {...props} />;
}
