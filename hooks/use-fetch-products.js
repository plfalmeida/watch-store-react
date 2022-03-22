import axios from 'axios';
import { useState, useEffect } from 'react';

export function useFetchProducts() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        let mounted = true;

        axios.get('/api/products')
            .then(res => {
                if (mounted) {
                    setProducts(res.data.products)
                }
            })
            .catch(err => {
                // TODO: Test unmounted 
                /* istanbul ignore next */
                if (mounted) {
                    setError(true);
                }
            });

        return () => {
            mounted = false;
        };
    }, [])

    return {
        products,
        error,
    }
}