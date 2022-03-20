import axios from 'axios';
import { useState, useEffect } from 'react';

export function useFetchProducts() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get('/api/products')
            .then(res => setProducts(res.data.products))
            .catch(err => setError(true));
    }, [])

    return {
        products,
        error,
    }
}