export type PloggingCourseCreateType = 'ADDRESS' | 'CLICK' | 'MANUAL'
export type CreateTypeSelectOptionItemType = { label: string; value: PloggingCourseCreateType }
export type CreateTypeSelectOptionListType = CreateTypeSelectOptionItemType[]
export type AddressSelectOptionItemType = { label: string; value: string }
export type AddressSelectOptionListType = AddressSelectOptionItemType[]
