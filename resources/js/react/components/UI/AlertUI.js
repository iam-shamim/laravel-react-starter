import React, { useState } from 'react';
export default ({msg})=>{
  const [message, setMsg] = useState(msg);
  return (
      <div class="alert alert-danger" role="alert">
          { message }
          <button type="button" class="close">
              <span aria-hidden="true">&times;</span>
          </button>
      </div>
  );
};