import { lazy, Suspense } from "react";

const PageOne = lazy(() => import('page_one/page_one'));

export const App = () => {
   return (
       <div>
           <h1>HOST APP</h1>
           <Suspense fallback={'loading...'}>
               <PageOne/>
           </Suspense>
       </div>
   )
}