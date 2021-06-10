/*
  Defined list api here
*/

const Apis = {
  API_HOST: process.env.REACT_APP_API_END_POINT,
  APT_IPFS_HEAD: process.env.REACT_APP_API_IPFS_HEAD,
  API_TAILER: {
    ME: '/user/me/',
    TEST: '/',
    LOGIN: '/user/login?address=',
    UPDATE_USER: '/user/',
    INVENTORY: '/mock/user-inventory/',
    GENERATE_SALE_ID: '/sale/generate-id/',
    LISTING_ON_MARKET: '/sale/publish-to-market/',
    LIST_NFT_ID_USER_LISTED: '/user-assets/nftid-listing/',
    SALE: '/sale/',
    LIST_NFT_USER_LISTED: '/user-assets/nft-listing/',
    NEW_LISTING: '/user-assets/new-listing/',
    LIST_NFT_ON_MARKET: '/user-assets/get-all/',
    FAVORITE_NFTS: '/favourite/',
    FAVORITE_NFT_UPDATE: '/favourite/saleid/',
    FAVORITE_NFT_GET_DETAIL: '/favourite/detail/',
    GET_SALE_BY_SALE_ID: '/user-assets/detail/',
  }
}

export default Apis;