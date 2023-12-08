import request from "./request";

type APIRequest<T, K> = (props: T) => Promise<K>
type key = "data"

interface Item {
    id: number;
    name: string;
    description: string;
    like_count: number;
    comment_count: number;
    price: number;
    is_sold_out: boolean;
    shipping_fee: string;
    image: string;
    category_id: number
}

interface Category {
    id: number;
    name: string;
}

const getItems: APIRequest<null, Record<key, Item[]>> = () => {
    return request.get("/items")
}

const getCategories: APIRequest<null, Record<key, Category[]>> = () => {
    return request.get("/categories")
}

export {getItems, getCategories}