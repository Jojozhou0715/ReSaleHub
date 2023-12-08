import request from "./request";

type APIRequest<T, K> = (props: T) => Promise<K>

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
    category_id: number;
}

const getItemDetail: APIRequest<number, Item> = (id) => {
    return request.get(`/items/${id}`)
}

export {getItemDetail}