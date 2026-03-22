// src/components/Button/Button.jsx
// CSS is imported globally via src/styles/index.css → no per-component import needed

// Usage:
//   import Button from '../components/Button/Button'
// CSS is imported at the App level via index.css barrel

export default function Button({
  children,
  variant = 'primary',   // primary | secondary | ghost | danger
  size    = 'md',        // sm | md | lg | xl
  full    = false,
  loading = false,
  icon    = false,       // icon-only button
  as      = 'button',
  className = '',
  ...props
}) {
  const Tag = as;

  const cls = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    full  ? 'btn--full' : '',
    icon  ? 'btn--icon' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Tag className={cls} {...props}>
      {loading && <span className="btn__spinner" aria-hidden="true" />}
      {!loading && children}
    </Tag>
  );
}
