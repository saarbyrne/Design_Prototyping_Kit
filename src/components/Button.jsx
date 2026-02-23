import React from 'react'
import PropTypes from 'prop-types'
import '../styles/design-tokens.css'

function MedinahButton({
  children,
  variant = 'primary',
  size = 'small',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  style: styleOverride,
  ...props
}) {
  const padding = size === 'small'
    ? 'var(--spacing-sm) var(--spacing-md)'
    : 'calc(var(--spacing-sm) + 2px) calc(var(--spacing-md) + 2px)'

  const fontSize = size === 'small' ? 'var(--button-font-size)' : 'var(--font-size-base)'

  const computedStyle = {
    fontSize,
    fontWeight: 'var(--button-font-weight)',
    borderRadius: 'var(--button-border-radius)',
    padding,
    textTransform: 'var(--button-text-transform)',
    backgroundColor: variant === 'primary' ? 'var(--button-primary-bg)' : 'var(--button-secondary-bg)',
    color: variant === 'primary' ? 'var(--button-primary-color)' : 'var(--button-secondary-color)',
    border: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
  }

  const mergedStyle = {
    ...computedStyle,
    ...(styleOverride || {}),
  }

  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
      style={mergedStyle}
      {...props}
    >
      {children}
    </button>
  )
}

MedinahButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.oneOf(['small', 'medium']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string
}

export default MedinahButton