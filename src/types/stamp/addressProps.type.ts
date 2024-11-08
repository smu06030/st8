export interface AddressType {
  address_name: string; //전체도로명주소
  region_1depth_name: string; //1뎁스 도,시
  region_2depth_name?: string; //2뎁스 시,구(선택적)
  region_3depth_name?: string; //(선택적)
}
