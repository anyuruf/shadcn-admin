import { LoaderFunctionArgs, Outlet, useLoaderData } from 'react-router'
import { getSidebarState } from '@/lib/session-server';
import { ProductsLayout } from '@/components/layout/products-layout';


export async function loader({ request }: LoaderFunctionArgs) {
  const defaultOpen = (await getSidebarState(request)) ?? false

  return ({
    defaultOpen
  })
}

export default function Products() {
  const { defaultOpen } = useLoaderData<typeof loader> ();

  return (
    <ProductsLayout defaultOpen={defaultOpen} >
      <Outlet />
    </ProductsLayout>
  );
}
