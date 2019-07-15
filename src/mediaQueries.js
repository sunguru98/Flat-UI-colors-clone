const sizes = {
  'xs': '575.98px',
  'sm': '767.98px',
  'md': '991.98px',
  'lg': '1199.98px'
}
export default {
  up: sizeAttr => `@media (min-width: ${sizes[sizeAttr]})`,
  down: sizeAttr => `@media (max-width: ${sizes[sizeAttr]})`
}