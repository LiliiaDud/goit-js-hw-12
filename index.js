import{a as g,S as h,i}from"./assets/vendor-8-pyTk71.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const y="https://pixabay.com/api/",b="52351583-282e675a2a1d7a615546b9ab7";function L(s){return g.get(y,{params:{key:b,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(t=>t.data).catch(t=>{throw t})}const l=document.querySelector(".gallery"),u=document.querySelector('button[type="submit"]'),d=document.querySelector(".loader"),S=new h(".gallery a",{captionsData:"alt",captionDelay:200});function q(s){const t=s.map(({webformatURL:n,largeImageURL:o,tags:e,likes:r,views:a,comments:f,downloads:p})=>`
          <li class="gallery-item">
            <a href="${o}">
              <img src="${n}" alt="${e}" loading="lazy"/>
            </a>
            <div class="info">
              <p><b>Likes</b> ${r}</p>
              <p><b>Views</b> ${a}</p>
              <p><b>Comments</b> ${f}</p>
              <p><b>Downloads</b> ${p}</p>
            </div>
          </li>
        `).join("");l.insertAdjacentHTML("beforeend",t),S.refresh()}function w(){l.innerHTML=""}function $(){u.classList.add("hidden"),d.classList.remove("hidden")}function v(){d.classList.add("hidden"),u.classList.remove("hidden")}const m=document.querySelector(".form"),c={position:"topRight",timeout:2e3};m.addEventListener("submit",P);function P(s){s.preventDefault();const t=s.target.elements["search-text"].value.trim();if(!t){i.warning({...c,title:"Warning",message:"Please enter a search query!"});return}w(),$(),L(t).then(n=>{const{hits:o}=n;if(o.length===0){i.info({...c,message:"Sorry, there are no images matching your search query. Please try again!"});return}q(o),i.success({...c,message:`Found ${o.length} images for "${t}".`})}).catch(()=>{i.error({...c,title:"Error",message:"Something went wrong. Please try again later."})}).finally(()=>{v(),m.reset()})}
//# sourceMappingURL=index.js.map
