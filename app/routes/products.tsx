import {  Outlet } from 'react-router'

import { ProductsLayout } from '@/components/layout/products-layout';


export default function Products() {

  return (
    <ProductsLayout >
      <Outlet />
    </ProductsLayout>
  );
}
