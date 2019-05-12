import React, { Component, lazy, Suspense } from 'react';

export const component_load = (Component)=>{
    const ComponentLoad = lazy(() => import("../components/"+Component));
    return props => (
        <Suspense fallback={<div>Loading...</div>}>
            <ComponentLoad {...props} />
        </Suspense>
    );
};
