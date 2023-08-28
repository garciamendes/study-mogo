export const BULET_PLACEHOLDER = '0x2022'

export const renderBulets = () => {
  return String.fromCharCode(Number(BULET_PLACEHOLDER)).repeat(15)
}