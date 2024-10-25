export interface AddressPropsType {
  address_name: string; //전체도로명주소
  //   main_building_no: string; //건물번호(선택적)
  region_1depth_name: string; //1뎁스 도,시
  region_2depth_name?: string; //2뎁스 시,구(선택적)
  region_3depth_name?: string; //(선택적)
  //   road_name?: string; //도로명(선택적)
}
