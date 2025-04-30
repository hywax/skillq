interface VariantFilled {
  filled: string
}

interface VariantDuo {
  light: string
  dark: string
}

export type Variants = VariantFilled | VariantDuo | (VariantFilled & VariantDuo)

export interface MetaIcon {
  name: string
  aliases: string[]
  filled: boolean
  duo: boolean
}

export interface Meta {
  icons: MetaIcon[]
  pages: number
  total: number
}

export type Icons = Record<string, Variants>
