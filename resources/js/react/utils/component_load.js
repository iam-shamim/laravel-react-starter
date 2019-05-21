import React, { Component, lazy, Suspense } from 'react';
//<ComponentLoad {...props} />
export const component_load = (Component)=>{
    const ComponentLoad = lazy(() => import("../components/"+Component));
    const loading_component_spinner = (
        <div className="text-center">
            <i class="fa fa-spinner fa-pulse fa-fw" aria-hidden="true" id="loading_component_spinner"></i>
            <span class="sr-only">Loading...</span>
        </div>
    );
    return props => (
        <Suspense fallback={loading_component_spinner}>
            <ComponentLoad {...props} />
        </Suspense>
    );
};
