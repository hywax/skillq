interface VariantFilled {
  filled: string
}

interface VariantDuo {
  light: string
  dark: string
}

export type Variant = VariantFilled | VariantDuo | (VariantFilled & VariantDuo)

export interface Meta {
  icons: Record<string, MetaIcon>
  pages: {
    total: number
    perPage: number
    count: number
    list: string[][]
  }
}

export interface MetaIcon {
  name: string
  aliases: string[]
  filled: boolean
  duo: boolean
  page: number
  position: number
}

export type MetaPage = Variant[]
