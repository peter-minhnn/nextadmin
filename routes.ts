export const routes = {
    home: '/',
    ecommerce: {
        collections: '/collections',
        searchCollections: (categoryCode: string) => `collections?categoryCode=${categoryCode}`,
        productDetail: (slug: string) => `/products/${slug}`,
    },
    returnPolicy: '/return-policy',
    contact: '/contact',
    search: '/search'
}