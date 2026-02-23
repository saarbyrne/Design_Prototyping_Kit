import { colors, zIndices } from '@kitman/common/src/variables';
import { KITMAN_ICON_NAMES, KitmanIcon } from '@kitman/playbook/icons';
import {
  Tooltip,
  FormControlLabel,
  Checkbox,
} from '@kitman/playbook/components';

export const FavoriteCheckbox = ({
  label = null,
  checked,
  onChange,
  tooltipTitle = null,
}) => {
  const renderCheckbox = () => (
    <Checkbox
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      icon={<KitmanIcon name={KITMAN_ICON_NAMES.StarBorder} />}
      checkedIcon={<KitmanIcon name={KITMAN_ICON_NAMES.Star} />}
      sx={{
        p: 1,
        color: `${colors.yellow_100} !important`,
        '&.Mui-checked': {
          color: `${colors.yellow_100} !important`,
        },
      }}
    />
  );

  const renderLabel = (checkbox) => (
    <FormControlLabel label={label} aria-label={label} control={checkbox} />
  );

  const renderTooltip = (children) => (
    <Tooltip
      title={tooltipTitle}
      slotProps={{
        popper: {
          sx: {
            zIndex: zIndices.modal,
          },
        },
      }}
    >
      {children}
    </Tooltip>
  );

  if (label && tooltipTitle) {
    return renderTooltip(renderLabel(renderCheckbox()));
  }

  if (label) {
    return renderLabel(renderCheckbox());
  }

  if (tooltipTitle) {
    return renderTooltip(renderCheckbox());
  }

  return renderCheckbox();
};

export default FavoriteCheckbox;
