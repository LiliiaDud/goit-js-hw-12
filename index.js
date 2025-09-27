import{a as B,S as R,i as l}from"./assets/vendor-sn3b1bqD.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const A="https://pixabay.com/api/",O="52351583-282e675a2a1d7a615546b9ab7",W=15;async function p(e,n){try{const{data:o}=await B.get(A,{params:{key:O,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:n,per_page:W}});return o}catch(o){throw console.error("Request to API failed",o),o}}const g=document.querySelector(".gallery"),u=document.querySelector(".loader"),L=document.querySelector('button[type="submit"]'),v=document.querySelector(".load-more"),w=new R(".gallery a",{captionsData:"alt",captionDelay:200}),d={position:"topRight",timeout:2e3};function b(e){const n=e.map(({webformatURL:o,largeImageURL:s,tags:t,likes:r,views:i,comments:E,downloads:$})=>`
        <li class="gallery-item">
          <a href="${s}">
            <img src="${o}" alt="${t}" loading="lazy"/>
          </a>
          <div class="info">
            <div>
              <p class="info-title">Likes</p>
              <p class="info-value">${r}</p>
            </div>
            <div>
              <p class="info-title">Views</p>
              <p class="info-value">${i}</p>
            </div>
            <div>
              <p class="info-title">Comments</p>
              <p class="info-value">${E}</p>
            </div>
            <div>
              <p class="info-title">Downloads</p>
              <p class="info-value">${$}</p>
            </div>
          </div>
        </li>
      `).join("");g.insertAdjacentHTML("beforeend",n),w.refresh()}function x(){g.innerHTML="",w.refresh()}function D(){m(),L.disabled=!0,u.classList.remove("hidden")}function H(){u.classList.add("hidden"),L.disabled=!1}function _(){m(),u.classList.remove("hidden")}function z(e=!0){u.classList.add("hidden"),e&&S()}function S(){v.classList.remove("hidden")}function m(){v.classList.add("hidden")}function I(e){l.success({...d,message:e})}function M(e){l.error({...d,message:e})}function y(e){l.info({...d,message:e})}function N(e){l.warning({...d,title:"Warning",message:e})}const C=document.querySelector(".form"),G=document.querySelector(".load-more");let a="",c=1,f=0,h=!1;C.addEventListener("submit",Q);G.addEventListener("click",T);async function Q(e){e.preventDefault();const n=e.target.elements["search-text"].value.trim();if(!n){N("Please enter a search query!");return}j(n),F(),x(),m(),D();try{const{hits:o=[],totalHits:s=0}=await p(a,c);if(P(o))return;b(o),f+=o.length,q(s)?y("We're sorry, but you've reached the end of search results."):(I(`Found ${s} images for "${a}". Showing ${o.length}.`),S())}catch{M("Something went wrong. Please try again later.")}finally{H()}}async function T(){c+=1,_();try{const{hits:e=[],totalHits:n=0}=await p(a,c);if(P(e))return;b(e),f+=e.length,K(),q(n)&&y("We're sorry, but you've reached the end of search results.")}catch{M("Something went wrong. Please try again later.")}finally{z(!h)}}function j(e){a=e}function F(){h=!1,c=1,f=0}function K(){const e=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}function P(e){return e.length===0?(h=!0,y("We're sorry, but you've reached the end of search results."),!0):!1}function q(e){return f>=e?(h=!0,!0):!1}
//# sourceMappingURL=index.js.map
