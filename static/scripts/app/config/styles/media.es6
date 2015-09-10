export const SCREEN_MEDIA_QUERY = '@media'

export const MIN_EM_UNIT = 0.063
export const SM_SIZE = 40
export const MD_SIZE = 64
export const LG_SIZE = 90
export const XL_SIZE = 120

export const BREAK_XS = `${SCREEN_MEDIA_QUERY} (min-width: 0)`
export const BREAK_SM = `${SCREEN_MEDIA_QUERY} (min-width: ${SM_SIZE + MIN_EM_UNIT}em)`
export const BREAK_MD = `${SCREEN_MEDIA_QUERY} (min-width: ${MD_SIZE + MIN_EM_UNIT}em)`
export const BREAK_LG = `${SCREEN_MEDIA_QUERY} (min-width: ${LG_SIZE + MIN_EM_UNIT}em)`
export const BREAK_XL = `${SCREEN_MEDIA_QUERY} (min-width: ${XL_SIZE + MIN_EM_UNIT}em)`

export const BREAK_XS_ONLY = `${BREAK_XS} and (max-width: ${SM_SIZE}em)`
export const BREAK_SM_ONLY = `${BREAK_SM} and (max-width: ${MD_SIZE}em)`
export const BREAK_MD_ONLY = `${BREAK_MD} and (max-width: ${LG_SIZE}em)`
export const BREAK_LG_ONLY = `${BREAK_LG} and (max-width: ${XL_SIZE}em)`
export const BREAK_XL_ONLY = BREAK_XL

export function getBreakpoint(breakpoint = 'default', only = false) {
  switch (breakpoint) {
  case 'sm':
    return only ? BREAK_SM_ONLY : BREAK_SM
  case 'md':
    return only ? BREAK_SM_ONLY : BREAK_SM
  case 'lg':
    return only ? BREAK_SM_ONLY : BREAK_SM
  case 'xl':
    return only ? BREAK_SM_ONLY : BREAK_SM
  default:
    return only ? BREAK_XS_ONLY : BREAK_XS
  }
}
