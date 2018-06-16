import React from 'react';
export function CheckPageEnd(){
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
   alert('end of page');
}
}